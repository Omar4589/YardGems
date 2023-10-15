import React, { createContext, useContext, useState } from "react";

//This context is used to track and provide a state for the center point of the google map component and for its last zoom level.
//This allows for the user to navigate away from the map and back to it without starting at the inital lat and lng values in 'centerOfMap' state

//create context using createContext() 
const MapCenterContext = createContext();
//define map context using useContext hook and making it exportable
export const useMapCenterContext = () => {
  return useContext(MapCenterContext);
};

//Provider of states
export const MapCenterProvider = ({ children }) => {
  //tracks the center point of the map, initial values to Laredo, TX
  const [centerOfMap, setCenterOfMap] = useState({ lat: 27.54, lng: -99.485 });
  //tracks zoom level of map
  const [zoomLevel, setZoomLevel] = useState(13);

  return (
    <MapCenterContext.Provider
      value={{ centerOfMap, setCenterOfMap, zoomLevel, setZoomLevel }}
    >
      {children}
    </MapCenterContext.Provider>
  );
};
