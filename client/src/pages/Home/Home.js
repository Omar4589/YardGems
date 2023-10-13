import { useState, useEffect } from "react";
import { Box, Button } from "@mui/material";
import MapIcon from "@mui/icons-material/Map";
import ListAltIcon from "@mui/icons-material/ListAlt";
import GoogleMapsComponent from "../../components/GoogleMaps/GoogleMaps";
import styles from "./styles";
import AllListingsComponent from "../../components/AllListings/AllListingsComponent";

//This is essentially the homepage of our web app. (our header, nav, and footer are fixed)
//This simply contains 2 components, GoogleMaps component that renders to the left of the screen
//and the AllListingsComponent that renders to the right of the screen
const Home = () => {
  const [currentComponent, setComponent] = useState("Map");

  //----------HANDLERS ---------\\

  const toggleView = () => {
    setComponent(currentComponent === "Map" ? "List" : "Map");
  };

  const [isMobile, setIsMobile] = useState(true);

  // The `useEffect` hook is used to add event listeners and perform side effects.
  useEffect(() => {
    //This function updates the state value of showFooter based on the window width.
    const handleResize = () => {
      //Here we are setting the value by passing in the value of the expression
      //'is my window's innerWidth greater than 768 right now? true or false
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
