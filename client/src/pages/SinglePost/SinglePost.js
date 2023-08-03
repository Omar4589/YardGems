import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../../utils/queries";
import { EDIT_POST } from "../../utils/mutations";
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

const SinglePost = () => {
  // Use `useParams()` to retrieve value of the route parameter `:listingId`
  const { listingId } = useParams();

  const [editPost, { error }] = useMutation(EDIT_POST);

  //------------------useQuery for a single post -------\\
   const { loading, data: queryData } = useQuery(QUERY_SINGLE_POST, {
    variables: { listingId: listingId },  });

  // data from useQuery
  const post = queryData?.post || {};

  //------ part of autocomplete from googlemaps----\\
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete();

  // setting inital values for the both useState from current post so the user does not have
  //to update everything if they don't want
  const [selectedLocation, setSelectedLocation] = useState({
    address: post.address,
  });

  const [formState, setFormState] = useState({
    postDescription: post.postDescription,
    dateOfSale: post.dateOfSale,
    postName: post.postName,
    image: "",
  });

  // again had to reasign value to a different name due to usePlacesAutocomplete(),
  //having value has a reserved property, this inputChange for to gather data other than address
  const handleInputChange = (event) => {
    const { name, value: newVal } = event.target;
    setFormState({ ...formState, [name]: newVal });
  };

  //-----functions to handle the auto complete----\\
  const handleNewInputChange = (e) => {
    setValue(e.target.value);
  };

  // ---- for lat and lng---\\
  const handleOptionSelect = async (address) => {
    setValue(address, false);
    try {
      const results = await getGeocode({ address: address });
      const { lat, lng } = await getLatLng(results[0]);
      setSelectedLocation({ address, lat, lng });
      console.log(results, lat, lng);
      clearSuggestions();
    } catch (error) {
      console.error("Error:", error);
    }
  };

  //--------function to edit a post-----\\
  const editPostSubmit = async (e) => {
    e.preventDefault();
    // console.log(formState.address)
    // console.log(formState.postName)
    // console.log(formState.description)
    // console.log(formState.dateOfSale)
    try {
      const { updatedPost } = await editPost({
        variables: {
          ...formState,
          id: post._id,
          address: selectedLocation.address,
          lat: selectedLocation.lat,
          lng: selectedLocation.lng,
        },
      });
      setFormState({
        postDescription: "",
        dateOfSale: "",
        postName: "",
        image: "",
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

    console.log(formState.address)
    console.log(formState.postName)
    console.log(formState.postDescription)
    console.log(formState.dateOfSale)

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
            <Combobox onSelect={handleOptionSelect}>
              <p className="projectTitle">Address:</p>
              <ComboboxInput
                value={value}
                onChange={handleNewInputChange}
                disabled={!ready}
                className="comboBox-input"
                placeholder={post.address}
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
              label={post.postName}
              id="fullWidth"
              onChange={handleInputChange}
              value={formState.postName}
              name="postName"
              sx={{ backgroundColor: "white", borderRadius: ".5em" }}
            />
          </Grid>
          <Grid item xs={8}>
            <p className="projectTitle">Description:</p>
            <TextField
              multiline
              fullWidth
              label={post.postDescription}
              id="fullWidth"
              onChange={handleInputChange}
              value={formState.postDescription}
              name="description"
              sx={{ backgroundColor: "white", borderRadius: ".5em" }}
            />
          </Grid>
          <Grid item xs={8}>
            <p className="projectTitle">Date:</p>
            <input
              type="date"
              fullWidth
              label={post.dateOfSale}
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
