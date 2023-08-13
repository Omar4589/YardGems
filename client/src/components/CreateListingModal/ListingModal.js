//-----------------IMPORTS-----------------------//
import React, { useState } from "react";
import { Box, Button, Modal, Fade, Typography, Backdrop } from "@mui/material";
import { ADD_LISTING } from "../../utils/mutations";
import { TextField, Container } from "@mui/material";
import { useMutation } from "@apollo/client";
import { style } from "./modalStyles";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import "@reach/combobox/styles.css";
import dayjs from "dayjs";
import { ME_QUERY } from "../../utils/queries";

//-----------------------START OF COMPONENT-----------------------//
export const CreateListingModal = ({
  handleClose,
  handleOpen,
  listings,
  setListings,
}) => {
  //-----------------STATE---------------//
  const [selectedLocation, setSelectedLocation] = useState(null);

  const [addListing, { error }] = useMutation(ADD_LISTING);

  const [formState, setFormState] = useState({
    title:"",
    description: "",
    dateOfSale: "",
    image: "",
    author: "",
  });
  
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  // Helper function to convert date from "MM/DD/YYYY" format to "yyyy-mm-dd" format
  const formatDateToInputValue = (formattedDate) => {
    return dayjs(formattedDate).format("YYYY-MM-DD");
  };

  // for other field data
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // If the name of the input is "dateOfSale", format the date before setting it in the state.
    if (name === "dateOfSale") {
      const formattedDate = dayjs(value).format("MM/DD/YYYY");
      setFormState({ ...formState, [name]: formattedDate });
    } else {
      setFormState({ ...formState, [name]: value });
    }
  };

  // for address
  const handleNewInputChange = (e) => {
    setValue(e.target.value);
  };

  // for lat and lng
  const handleOptionSelect = async (address) => {
    setValue(address, false);
    try {
      const results = await getGeocode({ address: address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelectedLocation({ address, lat, lng });

      clearSuggestions();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // allows user to create a new Post
  const submitNewListing = async (e) => {
    e.preventDefault();
    try {
      const { data } = await addListing({
        variables: {
          ...formState,
          address: selectedLocation.address,
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        },
        update: (cache, { data: { addListing } }) => {
          // Read the existing cached data for the current user
          const cachedData = cache.readQuery({ query: ME_QUERY });

          // Update the cached data with the new listing
          cache.writeQuery({
            query: ME_QUERY,
            data: {
              me: {
                ...cachedData.me,
                userPosts: [...cachedData.me.userPosts, addListing],
              },
            },
          });
        },
      });
    
      // Assuming the response contains the newly created post
      const newListing = data.addListing;

      // Update the list of posts in the parent component (MyListings)
      setListings([...listings, newListing]);

      setFormState({
        title:"",
        description: "",
        dateOfSale: "",
        image: "",
        author: "",
      });
      // Reset the address input field to an empty string
      setValue("");
      handleClose(); // closing the modal
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={handleOpen}
        onClose={handleClose}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 1500,
          },
        }}
      >
        <Fade in={handleOpen}>
          <Box sx={style}>
            <Typography
              sx={{ display: "flex", justifyContent: "center" }}
              id="transition-modal-title"
              variant="h6"
              component="h2"
            >
              Create a new listing
            </Typography>
            <Box
              component="form"
              onSubmit={submitNewListing}
              sx={{ marginLeft: "25%" }}
            >
              <div>
                <Combobox onSelect={handleOptionSelect}>
                  <ComboboxInput
                    value={value}
                    onChange={handleNewInputChange}
                    disabled={!ready}
                    className="comboBox-input"
                    placeholder="Add a location"
                    style={{
                      width: "66%",
                      height: "3.6em",
                      marginBottom: "1.5em",
                      marginTop: "1em",
                      paddingLeft: "1em",
                      fontSize: "1em",
                    }}
                    required
                  />
                  <ComboboxPopover
                    style={{
                      zIndex: "99999",
                      width: "40%",
                      fontSize: "1em",
                      fontFamily: "sans-serif",
                    }}
                  >
                    <ComboboxList>
                      {status === "OK" &&
                        data.map(({ place_id, description }) => (
                          <ComboboxOption key={place_id} value={description} />
                        ))}
                    </ComboboxList>
                  </ComboboxPopover>
                </Combobox>
              </div>

              <TextField
                style={{
                  width: "70%",
                  height: "3.6em",
                  marginBottom: "1.5em",
                  marginTop: "1em",
                  fontSize: "1em",
                }}
                label="Listing Title"
                name="title"
                required
                onChange={handleInputChange}
                placeholder={formState.title}
                value={formState.title}
              />
              <TextField
                style={{
                  width: "70%",
                  height: "3.6em",
                  marginBottom: "1.5em",
                  marginTop: "1em",
                  fontSize: "1em",
                }}
                label="Description"
                name="description"
                required
                multiline
                onChange={handleInputChange}
                placeholder={formState.description}
                value={formState.description}
              />
              <input
                type="date"
                style={{
                  width: "70%",
                  height: "3.6em",
                  marginBottom: "1.5em",
                  marginTop: "1em",
                  fontSize: "1em",
                }}
                label="Date of the Sale"
                name="dateOfSale"
                required
                onChange={handleInputChange}
                placeholder={formState.dateOfSale}
                value={formatDateToInputValue(formState.dateOfSale)}
              />
              {/* <TextField
                    style={{width: '70%', height: '3.6em', marginBottom:'1.5em', marginTop:'1em',  fontSize: '1em'}}
                    label="Image"
                    name='image'
                    onChange={handleInputChange}
                    placeholder={formState.image}
                    value={formState.image}
                /> */}
              <br></br>
              <Button
                type="submit"
                variant="contained"
                sx={{ display: "flex", justifyContent: "center", width: "70%" }}
              >
                Add
              </Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};
