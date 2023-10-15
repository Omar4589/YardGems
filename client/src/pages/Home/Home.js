import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GoogleMapsComponent from "../../components/googleMaps/GoogleMaps";
import styles from "./styles";
import AllListingsComponent from "../../components/AllListings/AllListingsComponent";

//This is essentially the homepage of our web app. (our header, nav, and footer are fixed)
const Home = () => {
  //tracks if user is using a device with a width smaller than 768
  const [isMobile, setIsMobile] = useState(true);
  //state to track what component to load if in mobile view
  const [currentComponent, setComponent] = useState("Map");

  //this hook tracks the window size and sets the isMobile state accordingly
  useEffect(() => {
    const handleResize = () => {
      //check expression (window width)
      setIsMobile(window.innerWidth < 768);
    };

    //Here we create an event listener for the window's resize event, and pass `handleResize` as the event handler.
    window.addEventListener("resize", handleResize);

    //Here we call `handleResize` on the initial mount to set the initial value of `showFooter`.
    handleResize();

    //Here we define a 'cleanup' function that removes the resize event listener
    const cleanup = () => {
      window.removeEventListener("resize", handleResize);
    };

    // Clean up the event listener by removing it when the component is unmounted.
    return cleanup;
  }, []);

  //----------HANDLERS ---------\\
  //toggles between map and list view when in mobile view
  const toggleView = () => {
    setComponent(currentComponent === "Map" ? "List" : "Map");
  };

  return (
    <Box id="home-page" sx={{ ...styles.mainContainer }}>
      <Button
        sx={{ ...styles.button, display: isMobile ? "flex" : "none" }}
        component="label"
        variant="contained"
        onClick={toggleView}
        startIcon={currentComponent === "Map" ? <MapIcon /> : <ListAltIcon />}
      >
        {currentComponent === "Map" ? "Map" : "List"}
      </Button>

      <>
        <Box
          id="googlemaps-container"
          sx={{
            ...styles.map,
            display: isMobile && currentComponent === "List" ? "none" : "block",
          }}
        >
          <GoogleMapsComponent />
        </Box>

        <Box
          id="all-listings-component"
          sx={{
            ...styles.listings,
            display: isMobile && currentComponent === "Map" ? "none" : "block",
          }}
        >
          <AllListingsComponent />
        </Box>
      </>
    </Box>
  );
};

export default Home;
