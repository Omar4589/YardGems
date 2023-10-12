//-----------------IMPORTS-----------------------//
import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Modal,
  Fade,
  Typography,
  Backdrop,
  Snackbar,
  Alert,
  Input,
  TextField,
  Autocomplete,
  IconButton,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

import CloseIcon from "@mui/icons-material/Close";
import { DatePicker } from "@mui/x-date-pickers";
import styles from "./styles";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import dayjs from "dayjs";
import { useListingContext } from "../../utils/ListingContext";

//-----------------------START OF COMPONENT-----------------------//
export const CreateListingModal = ({ handleClose, handleOpen, addListing }) => {
  const { loggedInUserData } = useListingContext();

  //-----------------STATE---------------//
  //Here we create a state 'listingAddress' that will hold an object containing the address value of the listing
  const [listingAddress, setListingAddress] = useState({});

  // This state holds the array of images the user uploads before creating a new listing
  const [imageFiles, setImageFiles] = useState([]);
  // This state is used to display a toast message if the user tries to upload more than 5 images
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const [uploading, setUploading] = useState(false);

  const [titleLengthCheck, setTitleLengthCheck] = useState(true);
  const [descriptionLengthCheck, setDescriptionLengthCheck] = useState(true);

  //Closes pop over message
  const handleCloseSnackbar = () => {
    setTitleLengthCheck(true);
  };

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

  //Store list of addresses in a variable from the usePlacesAutoComplete hook data
  const listOfAddresses = data.map((object) => {
    return object.description;
  });

  //--------------FORM FIELD HANDLERES-----------//
  // Helper function to convert date from "MM/DD/YYYY" format to "yyyy-mm-dd" format
  const formatDateToInputValue = (formattedDate) => {
    return dayjs(formattedDate).format("YYYY-MM-DD");
  };

  //The function below handles updating the 'formState'
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormState({ ...formState, [name]: value });
  };

  //handles state update when date is selected
  const handleDateChange = (newDate) => {
    const formattedDate = dayjs(newDate).format("MM/DD/YYYY");
    setFormState({ ...formState, dateOfSale: formattedDate });
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
    if (files.length > 5) {
      // Show a toast message here
      setOpenSnackbar(true);
      // Reset the file input
      e.target.value = null;
      setImageFiles([]);
      return;
    }
    setImageFiles(files);
  };

  //The function below handles uploading images to Cloudinary
  const uploadImage = async () => {
    //we use the user's username from the context and send it to the server for file naming purposes
    const username = loggedInUserData.me.username;
    //when working with image uploads, we must send the data in a new FormData()
    const formData = new FormData();
    //We append key value pairs
    formData.append("username", username);
    //loop through imageFiles state array and append the images along with image names
    //the array is full of image objects, thats how we grab the whole file object and also just the file objects name property.
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
        //Sets the formstate.images array to the array of urls returned by the server

        console.log("uploadImage() returned a 200 status code");
        setUploading(false);
        console.log(data);
        return data.imageUrls;
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
    setUploading(true);

    try {
      if (formState.title.length > 50) {
        setTitleLengthCheck(false);
        return;
      }
      if (formState.description.length > 3000) {
        setDescriptionLengthCheck(false);
        return;
      }
      const images = await uploadImage();

      await addListing({
        description: formState.description,
        address: listingAddress.address,
        dateOfSale: formState.dateOfSale,
        images: images,
        title: formState.title,
        lat: listingAddress.lat,
        lng: listingAddress.lng,
      });

      //clear the formState
      setFormState({
        title: "",
        description: "",
        dateOfSale: "",
        images: [],
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

  console.log(imageFiles);

  return (
    <Modal
      id="create-listing-modal-container"
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
        <Box sx={{ ...styles.main }} id="listing-modal">
          <IconButton onClick={handleClose} sx={{ ...styles.button }}>
            <CloseIcon />
          </IconButton>
          <Typography sx={{ ...styles.heading }} id="transition-modal-title">
            Create a new listing
          </Typography>
          <form onSubmit={submitNewListing} style={{ ...styles.form }}>
            <Box sx={{ py: 1, mb: 1 }} id="address-field">
              <Typography component="label" sx={{ ...styles.labels }}>
                Address
              </Typography>
              <Autocomplete
                options={listOfAddresses}
                getOptionLabel={(option) => option}
                fullWidth
                onInputChange={(event, newValue) => {
                  handleAutoCompleteChange({ target: { value: newValue } });
                }}
                onChange={(event, newValue) => {
                  handleAddressSelection(newValue);
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add a location"
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

            <Box sx={{ py: 1, mb: 1 }} id="title-field">
              <Typography component="label" sx={{ ...styles.labels }}>
                Listing Title
              </Typography>
              <TextField
                style={{}}
                label="Listing Title"
                name="title"
                type="text"
                fullWidth
                variant="outlined"
                size="small"
                margin="none"
                multiline
                required
                onChange={handleInputChange}
                placeholder={formState.title}
                value={formState.title}
              />
            </Box>

            <Box sx={{ ...styles.inputBoxes }} id="description-field">
              <Typography component="label" sx={{ ...styles.labels }}>
                Description
              </Typography>
              <TextField
                style={{}}
                label="Description"
                name="description"
                fullWidth
                variant="outlined"
                size="small"
                margin="none"
                required
                multiline
                onChange={handleInputChange}
                placeholder={formState.description}
                value={formState.description}
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
                value={formatDateToInputValue(formState.dateOfSale)}
                onChange={(newDate) => handleDateChange(newDate)}
              />
            </Box>

            <Box
              id="images"
              style={{
                ...styles.inputBoxes,
              }}
            >
              <Typography component="label" sx={{ ...styles.labels }}>
                Images
              </Typography>
              <Button
                sx={{ ...styles.uploadButton }}
                component="label"
                variant="contained"
                startIcon={<CloudUploadIcon />}
              >
                {imageFiles.length === 0
                  ? "Upload images"
                  : `${imageFiles.length} images selected`}
                <input
                  id="file-input"
                  name="file"
                  fullWidth
                  variant="outlined"
                  size="small"
                  margin="none"
                  type="file"
                  multiple
                  hidden
                  onChange={handleFileChange}
                />
              </Button>

              {/* <Button
                variant="outlined"
                disabled={!imageFiles.length}
                sx={{ ...styles.uploadButton }}
                onClick={() => {
                  setUploading(true);
                  uploadImage();
                }}
              >
                {!uploading ? "Upload" : "Uploading, please wait..."}
              </Button> */}
            </Box>

            <Button
              type="submit"
              variant="contained"
              sx={{
                ...styles.addButton,
              }}
            >
              Add
            </Button>
          </form>

          <Snackbar
            open={
              openSnackbar ||
              uploading ||
              titleLengthCheck === false ||
              descriptionLengthCheck === false
            }
            autoHideDuration={5000}
            onClose={() => {
              setOpenSnackbar(false);
              setTitleLengthCheck(true);
              setDescriptionLengthCheck(true);
            }}
            anchorOrigin={{ vertical: "top", horizontal: "center" }}
          >
            <Alert
              onClose={() => {
                setOpenSnackbar(false);
                setTitleLengthCheck(true);
                setDescriptionLengthCheck(true);
              }}
              severity={openSnackbar ? "error" : uploading ? "info" : "error"}
              sx={{ ...styles.snackAlert }}
            >
              {openSnackbar
                ? "You can only upload a maximum of 5 images."
                : uploading
                ? "Upload images, please wait..."
                : !titleLengthCheck
                ? "Title must be no more than 23 characters."
                : !descriptionLengthCheck
                ? "Description must be no more than 3000 characters."
                : ""}
            </Alert>
          </Snackbar>
        </Box>
      </Fade>
    </Modal>
  );
};
