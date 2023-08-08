import { Box } from "@mui/material";
import GoogleMaps from "../../components/googleMaps/GoogleMaps";
import styles from "./styles";
import AllListingsComponent from "../../components/AllListings/AllListingsComponent";

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
