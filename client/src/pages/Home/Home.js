import { Box } from "@mui/material";
import GoogleMaps from "../../components/googleMaps/GoogleMaps";
import styles from "./styles";
import AllListingsComponent from "../../components/AllListings/AllListingsComponent";

//This is essentially the homepage of our web app. (our header, nav, and footer are fixed)
//This simply contains 2 components, GoogleMaps component that renders to the left of the screen
//and the AllListingsComponent that renders to the right of the screen
const Home = () => {
  return (
    <Box id="home-page" sx={{ ...styles.mainContainer }}>
      <Box id="googlemaps-container" sx={{ ...styles.map }}>
        <GoogleMaps />
      </Box>

      <Box id="all-listings-component" sx={{ ...styles.listings }}>
        <AllListingsComponent />
      </Box>
    </Box>
  );
};

export default Home;
