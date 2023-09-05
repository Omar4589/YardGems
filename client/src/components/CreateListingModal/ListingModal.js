//-----------------IMPORTS-----------------------//
import React, { useContext, useState } from "react";
import { useMutation } from "@apollo/client";
import { Box, Button, Modal, Fade, Typography, Backdrop } from "@mui/material";
import { TextField, Container } from "@mui/material";
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
import { useListingContext } from "../../utils/ListingContext";

//This is the modal used to create a new listing by a user who is logged in. You can find this component in the MyListings.js page.

//-----------------------START OF COMPONENT-----------------------//
export const CreateListingModal = ({ handleClose, handleOpen, addListing }) => {
  const { loggedInUserData } = useListingContext();

  //-----------------STATE---------------//
  //Here we create a state 'listingAddress' that will hold an object containing the address value of the listing
  const [listingAddress, setListingAddress] = useState({});

  const [imageFiles, setImageFiles] = useState([]);

  //We create this 'formState' to hold the rest of the listing properties, we set the intial state to empty strings
  const [formState, setFormState] = useState({
    title: "",
    description: "",
    dateOfSale: "",
    images: [],
    author: "",
  });

  //-----------------HOOKS-----------------//
  //This hook below is responsible for the autocomplete functionality of the app
  //It returns an object containing various properties and functions related to location-based autocomplete suggestions.
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  //--------------FORM FIELD HANDLERES-----------//
  // Helper function to convert date from "MM/DD/YYYY" format to "yyyy-mm-dd" format
  const formatDateToInputValue = (formattedDate) => {
    return dayjs(formattedDate).format("YYYY-MM-DD");
  };

  //The function below handles updating the 'formState'
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

  //The function below handles updating the value of the 'value' property that is return by 'usePlacesAutoComplete' hook.
  //We use the 'setValue' function that is provided by the 'usePlacesAutoComplete' hook.
  const handleAutoCompleteChange = (e) => {
    setValue(e.target.value);
  };

  // This function is triggered when a user selects an address from the autocomplete suggestions.
  //It updates the state with the selected address and its coordinates
  const handleAddressSelection = async (address) => {
    setValue(address, false);
    try {
      const results = await getGeocode({ address: address });
      const { lat, lng } = await getLatLng(results[0]);
      setListingAddress({ address, lat, lng });

      clearSuggestions();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  // This function handles setting the state when a user chooses a file from their device
  //We use this state in the uploadImage function. The state is passed into the formData
  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    setImageFiles(files);
  };

  console.log(imageFiles);
  //The function below handles uploading images to Cloudinary
  //After it uploads the image to cloudinary, it sets the formstate.image prop to the returned url
  const uploadImage = async () => {
    const username = loggedInUserData.me.username;
    const formData = new FormData();
    formData.append("username", username);
    imageFiles.forEach((file, index) => {
      formData.append(`images`, file);
      formData.append(`imageNames[]`, file.name);
    });

    try {
      const response = await fetch("/upload", {
        method: "POST",
        body: formData,
      });

      if (response.ok) {
        const data = await response.json();
        setFormState({ ...formState, images: data.imageUrls }); // Return the uploaded image URL
        console.log("uploadImage() returned a 200 status code");
      } else {
        throw new Error("Image upload failed");
      }
    } catch (error) {
      console.error("Error uploading image:", error);
      // Handle error, show a notification, etc.
      return null;
    }
  };

  //This function is responsible for creating and adding a listing to the database
  const submitNewListing = async (e) => {
    e.preventDefault();

    try {
      await addListing({
        description: formState.description,
        address: listingAddress.address,
        dateOfSale: formState.dateOfSale,
        images: formState.images,
        title: formState.title,
        lat: listingAddress.lat,
        lng: listingAddress.lng,
      });

      //clear the formState
      setFormState({
        title: "",
        description: "",
        dateOfSale: "",
        image: "",
        author: "",
      });
      setImageFiles([]);
      setListingAddress({});
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
            <form onSubmit={submitNewListing} sx={{ marginLeft: "25%" }}>
              <div>
                <Combobox onSelect={handleAddressSelection}>
                  <ComboboxInput
                    value={value}
                    onChange={handleAutoCompleteChange}
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
              <input
                type="file"
                multiple
                name="file"
                onChange={handleFileChange}
                style={{}}
                id="file-input"
              />
              {/* <label htmlFor="file-input">Select an image</label> */}
              <Button
                variant="outlined"
                component="span"
                disabled={!imageFiles.length}
                sx={{ marginRight: "1em" }}
                onClick={() => {
                  uploadImage();
                }}
              >
                Upload
              </Button>

              <br></br>
              <Button
                type="submit"
                variant="contained"
                sx={{ display: "flex", justifyContent: "center", width: "70%" }}
              >
                Add
              </Button>
            </form>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};
