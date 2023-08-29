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

export default function GoogleMaps() {
  // isLoaded is gives us access to the apiKey
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: "AIzaSyDvK10cezc3bexO_QfHK7MPRVCY2IIGVt4",
    libraries: ["places"],
  });
  // If the API is not loaded yet, show loading message
  if (!isLoaded) return <div>Loading...</div>;

  // Render the map component
  return <Map />;
}

function Map() {
  // State to manage the map center and selected marker
  const [center, setCenter] = useState({ lat: 29.42, lng: -98.49 });
  const [selected, setSelected] = useState(null);

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
    <div sx={{ backgroundColor: "#e8f5e9" }}>
      {/* below renders the google map */}
      <GoogleMap
        sx={{ marginLeft: "20%" }}
        zoom={10} //how far you want the map to be zoomed in
        center={center} // displays location
        mapContainerClassName="map-container" // styling
        onClick={() => setActiveMarker(null)}
        options={{
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
          <PlacesAutocomplete setSelected={setSelected} setCenter={setCenter} />
        </div>
        {allListings.map(
          (
            { _id, lat, lng, title, description, address, dateOfSale },
            index
          ) => {
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
                    <div>
                      <h3>{title}</h3>
                      <h5>{description}</h5>
                      <p>{address}</p>
                      <p>Date of event: {dateOfSale}</p>
                    </div>
                  </InfoWindow>
                ) : null}
              </MarkerF>
            );
          }
        )}
        {selected && <MarkerF position={selected} />}
      </GoogleMap>
    </div>
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

  // Fetch user's current location if available
  useEffect(() => {
    const getCurrentLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const { latitude, longitude } = position.coords;
            setCenter({ lat: latitude, lng: longitude });
          },
          (error) => {
            console.error("Error getting current location:", error);
          }
        );
      } else {
        console.error("Geolocation is not supported by this browser.");
      }
    };
    getCurrentLocation();
  }, []);

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
