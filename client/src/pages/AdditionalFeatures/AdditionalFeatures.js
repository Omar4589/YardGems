import React, { useState } from "react";
import { Box, Typography } from "@mui/material";
import styles from "./styles";
import iphone from "../../assets/images/iphone.PNG";

const AdditionalFeatures = () => {
  return (
    <Box sx={{ ...styles.mainContainer }}>
      <Typography sx={{ ...styles.heading }}>
        Sign Up to unlock additional features!
      </Typography>

      <Box sx={{ ...styles.featuresContainer }}>
        <Box item sx={{ ...styles.feature }}>
          <img src={iphone} alt="featureImage" style={styles.img} />
          <Typography sx={{ ...styles.typography }}>
            Create, View, and Manage your listings
          </Typography>
        </Box>
        <Box item sx={{ ...styles.feature }}>
          <img src={iphone} alt="featureImage" />
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
