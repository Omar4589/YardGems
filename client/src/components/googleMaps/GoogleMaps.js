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
import { useMapCenterContext } from "../../utils/MapCenterContext";

//this variables is used to load google's places API in useLoadScript hook below
const libraries = ["places"];


//-----------------START OF COMPONENT--------------//
export default function GoogleMaps() {
  //This hook is used to load google's APIs using your api key. 
  //the second option is the libraries variables, you can include more than just 'places'
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });
  //destructure of states and setters from mapCenterContext
  const { centerOfMap, setCenterOfMap, zoomLevel, setZoomLevel } =
  useMapCenterContext();

  //------------STATES---------------//
  //this state tracks if the listingModal should be displayed or hidden 
  const [listingModal, setListingModal] = useState(false);
//this tracks what address was selected from the search bar (currently disabled)
  const [selected, setSelected] = useState(null);
  //this tracks which listing was selected
  const [activeMarker, setActiveMarker] = useState(null);
  
  //-----------QUERIES----------//
  const { loading, data } = useQuery(QUERY_LISTINGS);
  //a variable where we store all the listings available in our database
  const allListings = data?.allListings || [];

 
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
//             setCenterofMap({ lat: latitude, lng: longitude });
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

//-----------------HANDLERS-------------//
//a function to update the state that tracks the center of the map
//when the user switches between pages/components, the map wont reload back to the starting point (Laredo)
  const mapMovement = (map) => {
    const handleCenterChanged = () => {
      const newCenter = map.getCenter();
      setCenterOfMap({
        lat: newCenter.lat(),
        lng: newCenter.lng(),
      });
    };

    map.addListener("dragend", handleCenterChanged);

    // New code for handling zoom changes
    const handleZoomChanged = () => {
      const newZoom = map.getZoom();
      setZoomLevel(newZoom);
      // You can set this to state if you want to keep track of it
    };
    map.addListener("zoom_changed", handleZoomChanged);

    return () => {
      // Cleanup: remove the event listener
      map.removeListener("dragend", handleCenterChanged);

      map.removeListener("zoom_changed", handleZoomChanged);
    };
  };

  const openModal = (listing) => setListingModal(listing);
  const closeModal = () => setListingModal(false);
  //handles the render of infoWindow
  const handleActiveMarker = (markerId) => {
    if (markerId === activeMarker) {
      return;
    }
    setActiveMarker(markerId);
  };


  // If the API is not loaded yet, show loading message
  if (loadError)
    return (
      <div>Something went wrong. Please contact the site administrator.</div>
    );
  if (!isLoaded) return <div>Loading...</div>;

  return (
    <Box className="main">
      <GoogleMap
        onLoad={mapMovement}
        zoom={zoomLevel} //how far you want the map to be zoomed in
        center={centerOfMap} // displays location
        mapContainerClassName="map-container" // styling
        onClick={() => setActiveMarker(null)}
        options={{
          streetViewControl: false, 
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

//underneath is the search bar, its currently not used.
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
