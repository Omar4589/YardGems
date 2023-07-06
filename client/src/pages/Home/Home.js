import { Box } from "@mui/material";
import GoogleMaps from "../../components/googleMaps/GoogleMaps";
import styles from "./styles";

const Home = () => {
  return (
    <Box sx={{ ...styles.mainContainer }}>
      <Box sx={{ ...styles.map }}>
        <GoogleMaps />
      </Box>
      <Box sx={{ ...styles.listings }}>Listings Go Here....</Box>
    </Box>
  );
};

export default Home;
