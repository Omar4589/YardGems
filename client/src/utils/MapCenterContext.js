import React, { createContext, useContext, useState } from "react";

const MapCenterContext = createContext();

export const useMapCenterContext = () => {
  return useContext(MapCenterContext);
};

export const MapCenterProvider = ({ children }) => {
  const [centerOfMap, setCenterOfMap] = useState({ lat: 27.54, lng: -99.485 });
  const [zoomLevel, setZoomLevel] = useState(13);

  return (
    <MapCenterContext.Provider
      value={{ centerOfMap, setCenterOfMap, zoomLevel, setZoomLevel }}
    >
      {children}
    </MapCenterContext.Provider>
  );
};
