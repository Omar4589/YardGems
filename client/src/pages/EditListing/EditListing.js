//-----------------IMPORTS-----------------------//
import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@apollo/client";
import { QUERY_SINGLE_LISTING } from "../../utils/queries";
import { Container, Box, Grid, TextField, Button } from "@mui/material/";
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
import "./singlePost.css";
import { useListingContext } from "../../utils/ListingContext";
import { useNavigate } from "react-router-dom";

//-----------------------START OF COMPONENT-----------------------//
const SinglePost = () => {
  //destrcture from ListingContext
  const { editAListing } = useListingContext();
  //Here we set a variable for the userNavigate hook from react-router-dom
  const navigate = useNavigate(); 

  //-----------------STATE---------------//
  //First state: 'listingAddress' and set the intial state to empty object because we expect an object when setting the state
  const [listingAddress, setListingAddress] = useState({});

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
      image: "",
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
    console.log("formState:", formState);
    console.log("listingAddress:", listingAddress);
    console.log("listing ID:", listingId);

    e.preventDefault();

    try {
      await editAListing({
        id: formState.id,
        description: formState.description,
        address: listingAddress.address,
        dateOfSale: formState.dateOfSale,
        image: formState.image,
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

  // Only render the component if data has been fetched
  if (loading || !queryData) {
    return <div>Loading...</div>;
  }

  return (
    <Container
      maxWidth="xl"
      sx={{
        display: "flex",
        justifyContent: "center",
        marginTop: "2em",
        backgroundColor: "#e8f5e9",
        fontFamily: "Helvetica, sans-serif",
      }}
    >
      <Box
        sx={{
          padding: ".3em",
          marginRight: "2%",
          letterSpacing: ".1em",
          fontSize: "1.5em",
        }}
      >
        Edit Listing
      </Box>
      <Box
        component="form"
        sx={{ border: "3px #a5d6a7 solid", margin: "1em" }}
        onSubmit={editPostSubmit}
      >
        <Grid sx={{ justifyContent: "center" }} container spacing={2}>
          <Grid item xs={8}>
            <Combobox onSelect={handleAddressSelection}>
              <p className="projectTitle">Address:</p>
              <ComboboxInput
                value={value}
                onChange={handleAutoCompleteChange}
                disabled={!ready}
                className="comboBox-input"
                placeholder={queryData.listing.address}
                style={{
                  width: "96%",
                  height: "3.6em",
                  paddingLeft: "1em",
                  fontSize: "1em",
                  borderRadius: ".5em",
                }}
              />
              <ComboboxPopover
                style={{
                  zIndex: "99999",
                  width: "70%",
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
          </Grid>
          <Grid item xs={8}>
            <p className="projectTitle">Title:</p>
            <TextField
              fullWidth
              label={queryData.listing.title}
              id="fullWidth"
              onChange={handleInputChange}
              value={formState.title}
              name="title"
              sx={{ backgroundColor: "white", borderRadius: ".5em" }}
            />
          </Grid>
          <Grid item xs={8}>
            <p className="projectdescription">Description:</p>
            <TextField
              multiline
              fullWidth
              label={queryData.listing.description}
              id="fullWidth"
              onChange={handleInputChange}
              value={formState.description}
              name="description"
              sx={{ backgroundColor: "white", borderRadius: ".5em" }}
            />
          </Grid>
          <Grid item xs={8}>
            <p className="projectDate">Date:</p>
            <input
              type="date"
              fullWidth
              label={queryData.listing.dateOfSale}
              id="fullWidth"
              style={{
                width: "100%",
                height: "3.6em",
                marginBottom: "1.5em",
                marginTop: "1em",
                fontSize: "1em",
              }}
              onChange={handleInputChange}
              value={formState.dateOfSale}
              name="dateOfSale"
              sx={{ backgroundColor: "white", borderRadius: ".5em" }}
            />
          </Grid>
          <Grid item xs={8}>
            {/* <TextField fullWidth label="fullWidth" id="fullWidth" 
                        
                        /> */}
          </Grid>
        </Grid>
        <Button type="submit">Submit Edit</Button>
      </Box>
    </Container>
  );
};

export default SinglePost;
