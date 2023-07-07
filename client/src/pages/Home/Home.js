import { Box } from "@mui/material";
import GoogleMaps from "../../components/googleMaps/GoogleMaps";
import styles from "./styles";
import AllListings from "../../components/AllListings/AllListings";

const Home = () => {
  return (
    <Box sx={{ ...styles.mainContainer }}>
      <Box sx={{ ...styles.map }}>
        <GoogleMaps />
      </Box>
      <Box sx={{ ...styles.listings }}>
        <AllListings />
        </Box>
    </Box>
  );
};

export default Home;
