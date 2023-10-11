import React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./styles";
import iphone1 from "../../assets/images/iphone1.png";
import iphone2 from "../../assets/images/iphone2.png";

//This is the AdditionalFeatures page is displayed if a user clicks on "MyListings","SavedListings","MyAccount" and they are not logged in.
const AdditionalFeatures = () => {
  return (
    <Box sx={{ ...styles.mainContainer }}>
      <Typography sx={{ ...styles.heading }}>
        Sign Up to unlock additional features!
      </Typography>

      <Box sx={{ ...styles.featuresContainer }}>
        <Box sx={{ ...styles.feature }}>
          <img src={iphone1} alt="featureImage" style={styles.img} />
          <Typography sx={{ ...styles.typography }}>
            Create, View, and Manage your listings
          </Typography>
        </Box>
        <Box sx={{ ...styles.feature }}>
          <img src={iphone2} alt="featureImage" />
          <Typography sx={{ ...styles.typography }}>
            See a listing you want to keep an eye on? Save it to view it under
            'Saved Listings'
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default AdditionalFeatures;
