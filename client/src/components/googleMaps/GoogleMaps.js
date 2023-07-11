import React, { useState, useEffect} from "react";
import {useQuery} from '@apollo/client';
import {QUERY_POSTS} from '../../utils/queries';
import { GoogleMap, useLoadScript, MarkerF, InfoWindow, scale } from "@react-google-maps/api";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption, } from "@reach/combobox";
import "@reach/combobox/styles.css";
import './google.css';
import gem from '../../assets/images/greenGem.png';

export default function GoogleMaps() {
// isLoaded is gives us access to the apiKey
 const { isLoaded } = useLoadScript({ 
  googleMapsApiKey: "AIzaSyDvK10cezc3bexO_QfHK7MPRVCY2IIGVt4",
  libraries: ['places'],
});
// is we don't have access return loading, if we do return the Map
 if (!isLoaded) return <div>Loading...</div>;
 return <Map />; // from below function Map
}


// this returns the map with a marker taken from the PlacesAutoComplete
function Map() {
// center is used to redirect to the selected city
// selected is for value selected from user to place pin 
const [center, setCenter] = useState({ lat: 29.42, lng: -98.49 })
const [selected, setSelected] = useState(null);
const { loading, data } = useQuery(QUERY_POSTS); 
const allPost = data?.allPost || []; 

const [activeMarker, setActiveMarker] = useState(null); // for window popups 
  const handleActiveMarker = (markerF) => {
    if (markerF === activeMarker) {
      return;
    }
    setActiveMarker(markerF);
  };

  return (
  <div sx={{ backgroundColor: '#e8f5e9'}}>
    <div className='places-container'>
    {/* will render out a placed based on the selection */}
        <PlacesAutocomplete setSelected={setSelected} setCenter={setCenter}/> 
    </div>

    {/* below renders the google map */}
    <GoogleMap
    sx={{marginLeft:'20%'}}
     zoom={10} //how far you want the map to be zoomed in
     center={ center } // displays location
     mapContainerClassName='map-container' // styling
     onClick={() => setActiveMarker(null)}
    options={{  styles: [{ elementType: "labels", featureType: "poi.business", stylers: [{ visibility: "off", }], }],}}
     
    >
      {allPost.map(({_id, lat, lng, postName, postDescription, address, dateOfSale }, index) => {
        return ( 
        <MarkerF key={_id} 
        position={{ lat: parseFloat(lat), lng: parseFloat(lng)}}
        onClick={() => handleActiveMarker(_id)}
        icon ={{
          url: gem
        }}          
        >
          {activeMarker === _id ? ( 
            <InfoWindow onCloseClick={() => setActiveMarker(null)}>
              <div>
                <h3>{postName}</h3>
                <h5>{postDescription}</h5>
                <p>{address}</p>
                <p>Date of event: {dateOfSale}</p>
              </div>
            </InfoWindow>
          ) : null}
        </MarkerF>)
      })}
      { selected && <MarkerF position={selected} />}
    </GoogleMap>
  </div>
 );
};


// this handles the autoComplete Box
const PlacesAutocomplete = ({ setSelected, setCenter }) => { 

  const {ready, value, setValue , suggestions: {status, data}, clearSuggestions} = usePlacesAutocomplete(); // will give us some data back from the UI, ready is based on is the google script is ready to go, value / setValue is what the user has typed in, suggestions is that status of the result, data (all the attributes), clearSuggestions is what the user has clearly chose 
    // will render once when the page loads, a window will pop up asking to share location info with google
    // if user clicks yes, then will cache, and automatically render the map to user's current location
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
  

  // handleSelect will be a async function bc we will be converting the value selected to a lat and long 
    // val will be passsed as a string from the value selected 
    const handleSelect = async (address) => {
        setValue(address, false); // setting to false to not fetch any other data 
        clearSuggestions(); // this will clear the autofill suggestions / function from google map api (i did not create)
      console.log(address)
        // results is equal to the value the user chose
        const results = await getGeocode({address});
        // now converting results to lat and long
        const {lat, lng} = await getLatLng(results[0]);
        // this will set our selectedState to create where our marker gets placed based on user input
        setSelected({lat, lng});
        setCenter({ lat, lng });
        
    }
    
    return (
    // combobox is a container basically with capturing the value selected 
    <Combobox onSelect={handleSelect} className="comboBox-container" >
        {/* create input box */}
        {/* onChange is caputring value from the input box and setting new value */}
        {/* disable means dont render if not ready (connected to googlemap) */}
        <ComboboxInput  value={value} onChange={(e) => setValue(e.target.value)} disabled={!ready} className='comboBox-input' placeholder='Search Box'/> 
        {/* popover shows the results */}
        <ComboboxPopover>
            {/* comboBoxList shows all the suggestions */}
            <ComboboxList>
                {/* if search is successful then render out the actual suggestions, the data from the suggestions will return an array so we need to map over each one */}
                {/* comboBoxOption gives us a drop down suggestions */}
                {status === 'OK' && data.map(({place_id, description}) => (
                <ComboboxOption key={place_id} value={description}/>
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