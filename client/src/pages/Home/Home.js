import { Box } from "@mui/material";
import GoogleMaps from "../../components/googleMaps/GoogleMaps";
import styles from "./styles";
import AllListingsComponent from "../../components/AllListings/AllListingsComponent";

//This is essentially the homepage of our web app. (our header, nav, and footer are fixed) 
//This simply contains 2 components, GoogleMaps component that renders to the left of the screen
//and the AllListingsComponent that renders to the right of the screen 
const Home = () => {
  return (
    <Box sx={{ ...styles.mainContainer }}>
      <Box sx={{ ...styles.map }}>
        <GoogleMaps />
      </Box>

      <Box sx={{ ...styles.listings }}>
        <AllListingsComponent />
      </Box>
    </Box>
  );
};

export default Home;
