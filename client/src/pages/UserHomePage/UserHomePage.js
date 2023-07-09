import { Box } from "@mui/material";
import GoogleMaps from "../../components/googleMaps/GoogleMaps";
import styles from "../Home/styles.js";
import UserHome from "../../components/UserHomePage/UserHomePage";

const UserHomePage = () => {
  return (
    <Box sx={{ ...styles.mainContainer }}>
      <Box sx={{ ...styles.map }}>
        <GoogleMaps />
      </Box>
      <Box sx={{ ...styles.listings }}>
        <UserHome />
        </Box>
    </Box>
  );
};

export default UserHomePage;