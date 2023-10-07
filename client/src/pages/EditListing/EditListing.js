//-----------------IMPORTS-----------------------//
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_LISTING } from "../../utils/queries";
import {
  Container,
  Box,
  Grid,
  TextField,
  Button,
  Typography,
  Autocomplete,
} from "@mui/material/";
import dayjs from "dayjs";
import { DatePicker } from "@mui/x-date-pickers";
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
import "./styles.js";
import { useListingContext } from "../../utils/ListingContext";
import { useNavigate } from "react-router-dom";
import styles from "./styles";

//-----------------------START OF COMPONENT-----------------------//
const SinglePost = () => {
  //destrcture from ListingContext
  const { editAListing } = useListingContext();
  //Here we set a variable for the userNavigate hook from react-router-dom
  const navigate = useNavigate();

  //-----------------STATE---------------//
  //First state: 'listingAddress' and set the intial state to empty object because we expect an object when setting the state
  const [listingAddress, setListingAddress] = useState("");

  //Second state: 'formState' and set the intial state to an empty object
  const [formState, setFormState] = useState({});

  //-----------------HOOKS-----------------//
  //Here we use the useParams hook to destructure the listingID param that we defined in App.js
  const { listingId } = useParams();

  //This hook below is responsible for the autocomplete functionality of the app
  //It returns an object containing various properties and functions related to location-based autocomplete suggestions.
  const {
    ready, //readiness of the autocomplete functionality.
    value, //the current input value of the autocomplete input field
    suggestions: {
      status, //the status of the suggestions: loading, no results, or suggestions are available
      data, //suggestion items returned by autocomplete system
    },
    setValue, //a function provided by usePlacesAutocomplete() that updates the value property
    clearSuggestions, //a function provided by the hook that clears or resets the suggestions
  } = usePlacesAutocomplete();

  //Store list of addresses in a variable from the usePlacesAutoComplete hook data
  const listOfAddresses = data.map((object) => {
    return object.description;
  });

  //Here we use the 'QUERY_SINGLE_LISTING' query to fetch the listing data we want to edit
  // based on the listingId we got from the url param
  const { loading, data: queryData } = useQuery(QUERY_SINGLE_LISTING, {
    variables: { listingId: listingId },
  });

  // This use effect runs when the component mounts and is responsible for
  //setting the formState and listingAddress states to the data that we fetch from database
  //this data is the listing data the user selected to edit
  useEffect(() => {
    const fetchedListing = queryData?.listing || {};

    setFormState({
      id: fetchedListing._id,
      title: fetchedListing.title,
      description: fetchedListing.description,
      dateOfSale: fetchedListing.dateOfSale,
      images: fetchedListing.images,
    });
    setListingAddress(fetchedListing.address);
  }, [queryData]);

  //--------------FORM FIELD HANDLERS-----------//
  //The function below handles updating the 'formState'
  const handleInputChange = (event) => {
    const { name, value: newVal } = event.target;
    setFormState({ ...formState, [name]: newVal });
  };

  //The function below handles updating the value of the 'value' property that is return by 'usePlacesAutoComplete' hook.
  //We use the 'setValue' function that is provided by the 'usePlacesAutoComplete' hook.
  const handleAutoCompleteChange = (e) => {
    setValue(e.target.value);
  };

  //handles state update when date is selected
  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format("MM/DD/YYYY");
    setFormState({ ...formState, dateOfSale: formattedDate });
  };

  // This function is triggered when a user selects an address from the autocomplete suggestions.
  //It updates the state with the selected address and its coordinates
  const handleAddressSelection = async (address) => {
    setValue(address, false); // Set the selected address as the value in the autocomplete input; The second argument false indicates that the value should not be immediately focused after selection.
    try {
      const results = await getGeocode({ address: address }); // Retrieve geocode data for the selected address
      const { lat, lng } = await getLatLng(results[0]); // Extract latitude and longitude from geocode data
      setListingAddress({ address, lat, lng }); // Update the state with the selected address and its coordinates
      console.log(results, lat, lng);
      clearSuggestions();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //This function is responsible for the modification of the post,
  //it uses the 'editPost mutation which sends the editedPost to the database and then
  //it reassigns the window location to navigate user to /MyListings
  const editPostSubmit = async (e) => {
    e.preventDefault();

    try {
      await editAListing({
        id: formState.id,
        description: formState.description,
        address: listingAddress.address,
        dateOfSale: formState.dateOfSale,
        images: formState.images,
        title: formState.title,
        lat: listingAddress.lat,
        lng: listingAddress.lng,
      });
      setFormState({
        description: "",
        dateOfSale: "",
        title: "",
        image: "",
      });

      navigate("/MyListings");
    } catch (err) {
      console.error(err);
    }
  };

  console.log(listingAddress);

  // Only render the component if data has been fetched
  if (loading || !queryData) {
    return <div>Loading...</div>;
  }

  return (
    <Container sx={{ ...styles.mainContainer }}>
      <Box
        id="edit-listing-container"
        sx={{
          ...styles.editListingContainer,
        }}
      >
        <Typography
          sx={{
            ...styles.heading,
          }}
        >
          Edit Listing
        </Typography>

        <form id="edit-listing-form" onSubmit={editPostSubmit}>
          <Box sx={{ ...styles.inputBoxes }}>
            <Typography component="label" sx={{ ...styles.labels }}>
              Address
            </Typography>
            <Autocomplete
              options={listOfAddresses}
              getOptionLabel={(option) => option}
              fullWidth
              value={listingAddress || ""}
              onInputChange={(event, newValue) => {
                handleAutoCompleteChange({ target: { value: newValue } });
              }}
              onChange={(event, newValue) => {
                handleAddressSelection(newValue);
              }}
              renderInput={(params) => (
                <TextField
                  {...params}
                  label={queryData.listing.address}
                  name="location"
                  type="text"
                  variant="outlined"
                  size="small"
                  margin="none"
                  required
                />
              )}
            />
          </Box>

          <Box sx={{ ...styles.inputBoxes }}>
            <Typography component="label" sx={{ ...styles.labels }}>
              Title:
            </Typography>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              margin="none"
              fullWidth
              label={queryData.listing.title}
              id="project-title"
              onChange={handleInputChange}
              value={formState.title || ""}
              name="title"
            />
          </Box>

          <Box sx={{ ...styles.inputBoxes }}>
            <Typography
              component="label"
              className="projectdescription"
              sx={{ ...styles.labels }}
            >
              Description:
            </Typography>
            <TextField
              type="text"
              variant="outlined"
              size="small"
              margin="none"
              multiline
              fullWidth
              label={queryData.listing.description}
              id="project-description"
              onChange={handleInputChange}
              value={formState.description || ""}
              name="description"
            />
          </Box>

          <Box sx={{ ...styles.inputBoxes }} id="date-field">
            <Typography component="label" sx={{ ...styles.labels }}>
              Date of sale
            </Typography>
            <DatePicker
              sx={{ ...styles.datePicker }}
              label="Date of the Sale"
              name="dateOfSale"
              fullWidth
              variant="outlined"
              size="small"
              margin="none"
              required
              value={dayjs(formState.dateOfSale) || ""}
              onChange={(newDate) => handleDateChange(newDate)}
            />
          </Box>

          {/* <TextField fullWidth label="fullWidth" id="fullWidth"  /> */}

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              ...styles.button,
            }}
          >
            Submit Edit
          </Button>
        </form>
      </Box>
    </Container>
  );
};

export default SinglePost;
