import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { QUERY_LISTINGS } from "../../utils/queries";
import {
  GoogleMap,
  useLoadScript,
  MarkerF,
  InfoWindow,
} from "@react-google-maps/api";
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
import "./google.css";
import gem from "../../assets/images/greenGem.png";
import ListingModalComponent from "../ViewListingModal/ListingModalComponent";
import image from "../../assets/yardsale.jpg";
import { Box, Typography, Button, CardMedia } from "@mui/material";
import styles from "./styles";

const libraries = ["places"];

export default function GoogleMaps() {
  // isLoaded is gives us access to the apiKey
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  // If the API is not loaded yet, show loading message
  if (!isLoaded) return <div>Loading...</div>;

  // Render the map component
  return <Map />;
}

function Map() {
  const [listingModal, setListingModal] = useState(false);

  const openModal = (listing) => setListingModal(listing);
  //Closes modal when listings is clicked on
  const closeModal = () => setListingModal(false);

  // State to manage the map center and selected marker
  const [center, setCenter] = useState({ lat: 27.54, lng: -99.485 });
  const [selected, setSelected] = useState(null);

  

  //Fetch user's current location if available
  // useEffect(() => {
  //   let isMounted = true;

  //   const getCurrentLocation = () => {
  //     if (navigator.geolocation) {
  //       navigator.geolocation.getCurrentPosition(
  //         (position) => {
  //           if (isMounted) {
  //             // Check if the component is still mounted
  //             const { latitude, longitude } = position.coords;
  //             setCenter({ lat: latitude, lng: longitude });
  //           }
  //         },
  //         (error) => {
  //           if (isMounted) {
  //             // Check if the component is still mounted
  //             console.error("Error getting current location:", error);
  //           }
  //         }
  //       );
  //     } else {
  //       if (isMounted) {
  //         // Check if the component is still mounted
  //         console.error("Geolocation is not supported by this browser.");
  //       }
  //     }
  //   };
  //   getCurrentLocation();

  //   return () => {
  //     isMounted = false; // Cleanup: set flag to false when component unmounts
  //   };
  // }, []);

  // Fetch listing data using Apollo useQuery
  const { loading, data } = useQuery(QUERY_LISTINGS);
  const allListings = data?.allListings || [];

  // State to manage active marker for InfoWindow display
  const [activeMarker, setActiveMarker] = useState(null);
  const handleActiveMarker = (markerId) => {
    if (markerId === activeMarker) {
      return;
    }
    setActiveMarker(markerId);
  };

  return (
    <Box className="main">
      {/* below renders the google map */}
      <GoogleMap
        zoom={13} //how far you want the map to be zoomed in
        center={center} // displays location
        mapContainerClassName="map-container" // styling
        onClick={() => setActiveMarker(null)}
        options={{
          streetViewControl: false, // Removes the Pegman
          fullscreenControl: false,
          gestureHandling: "greedy",
          mapTypeControl: false,
          zoomControl: false,
          styles: [
            {
              elementType: "labels",
              featureType: "poi.business",
              stylers: [{ visibility: "off" }],
            },
          ],
        }}
      >
        <div className="places-container">
          {/* will render out a placed based on the selection */}
          {/* <PlacesAutocomplete setSelected={setSelected} setCenter={setCenter} /> */}
        </div>
        {allListings.map(
          (
            {
              _id,
              author,
              lat,
              lng,
              title,
              description,
              images,
              address,
              dateOfSale,
            },
            index
          ) => {
            const listing = {
              _id,
              author,
              lat,
              lng,
              title,
              description,
              images,
              address,
              dateOfSale,
            };

            return (
              <MarkerF
                key={_id}
                position={{ lat: parseFloat(lat), lng: parseFloat(lng) }}
                onClick={() => handleActiveMarker(_id)}
                icon={{
                  url: gem,
                }}
              >
                {activeMarker === _id ? (
                  <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                    <Box>
                      <Button
                        onClick={() => openModal(listing)}
                        sx={{ ...styles.viewListing }}
                      >
                        View Listing
                      </Button>
                      <Typography variant="h5" sx={{ ...styles.text }}>
                        {title}
                      </Typography>
                      <Typography variant="body2" sx={{ ...styles.text }}>
                        {description}
                      </Typography>
                      <Typography variant="body4" sx={{ ...styles.text }}>
                        {address}
                      </Typography>
                      <Typography variant="body4" sx={{ ...styles.text }}>
                        Date of event: {dateOfSale}
                      </Typography>
                      <Box sx={{ ...styles.imageContainer }}>
                        {images.map((imageURL, imgIndex) => (
                          <CardMedia
                            component="img"
                            image={imageURL}
                            key={imgIndex}
                            alt={`${title}-${imgIndex}`}
                            sx={{ height: "6em", width: "6em" }}
                          />
                        ))}
                      </Box>
                    </Box>
                  </InfoWindow>
                ) : null}
              </MarkerF>
            );
          }
        )}
        {selected && <MarkerF position={selected} />}
      </GoogleMap>
      {listingModal && (
        <ListingModalComponent
          listingModal={listingModal}
          closeModal={closeModal}
          image={image}
        />
      )}
    </Box>
  );
}

const PlacesAutocomplete = ({ setSelected, setCenter }) => {
  // Use the usePlacesAutocomplete hook to manage Places Autocomplete functionality
  const {
    ready,
    value,
    setValue,
    suggestions: { status, data },
    clearSuggestions,
  } = usePlacesAutocomplete();

  // Handle selection of a place from Autocomplete suggestions
  const handleSelect = async (address) => {
    setValue(address, false);
    clearSuggestions();
    const results = await getGeocode({ address });
    const { lat, lng } = await getLatLng(results[0]);
    setSelected({ lat, lng });
    setCenter({ lat, lng });
  };

  return (
    // combobox is a container basically with capturing the value selected
    <Combobox onSelect={handleSelect}>
      {/* create input box */}
      {/* onChange is caputring value from the input box and setting new value */}
      {/* disable means dont render if not ready (connected to googlemap) */}
      <ComboboxInput
        value={value}
        onChange={(e) => setValue(e.target.value)}
        disabled={!ready}
        className="comboBox-input"
        placeholder="Search Box"
        style={{
          position: "absolute",
          top: "85px",
          left: "9px",
          zIndex: "99",
          minWidth: "200px",
        }}
      />
      {/* popover shows the results */}
      <ComboboxPopover>
        {/* comboBoxList shows all the suggestions */}
        <ComboboxList>
          {/* if search is successful then render out the actual suggestions, the data from the suggestions will return an array so we need to map over each one */}
          {/* comboBoxOption gives us a drop down suggestions */}
          {status === "OK" &&
            data.map(({ place_id, description }) => (
              <ComboboxOption key={place_id} value={description} />
            ))}
        </ComboboxList>
      </ComboboxPopover>
    </Combobox>
  );
};

// when GoogleMaps component renders, it will look for if i have access to useLoadScripts to
// connect to google maps and the libray, if i do not have access "loading" is displayed to users
//IF i do have access, its going to render the Map component
// the Map component is going to set two states: center and selected
// the selected state is to display a pin on the screen based on user input
// center state is to redirect maps to display the location selected by the user
// i then need to pass setCenter and setSelected to the PlacesAutocomplete  component
// these two states need to be passed in SO THAT i can access data from the user's input address
// SINCE we have a useEffect hook with an empty dependency, when the page first loads, its going to ask permission for google to use the user's location
// IF yes, google maps will redirect them to their current location by setting setCenter
//IF the user chooses to search for a different location, the Combobox element is going to listen for onSelect(handleSelect) event listener based on the user's input
// its going to take the value and use the usePlacesAutocomplete hook that has predeterminated properties to be used
// its going to take the value from the handleSelect event listener, pass it to the geoCode function
// SO THAT we can then get the lat and lng, then setCenter and setSelected to redirect the maps and pin

// i know the two states are both being set to lat and lng values, however, i made two states
// so that if the user does not want to share their location then the map will redirect them to
// the inital center value, and kept the selected state null to not place a pin until the user selects a address from input box
