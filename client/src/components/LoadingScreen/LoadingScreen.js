import React, { useEffect } from "react";
import { Box, CardMedia } from "@mui/material";
import yglogo from "../../assets/images/yargemsloadingscreenlogo.png";

//--------START OF COMPONENT--------//
const LoadingScreen = () => {
//this use effect includes a setTimeout function that runs after 1 second, it bings the scale of 'loadingBox' to 0.
  useEffect(() => {
    const element = document.getElementById("loadingBox");
    setTimeout(() => {
      element.style.transform = "scale(0)";
    }, 1000); // Start the transition after 1 seconds
  }, []);

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      position="fixed"
      top={0}
      left={0}
      width="100%"
      height="100vh"
      zIndex="99999"
      bgcolor="transparent"
    >
      <Box
        id="loadingBox"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={200} 
        height={200} 
        bgcolor="#ffffff"
        sx={{
          borderRadius: "100%",
          transform: "scale(10)", 
          transition: "transform 0.3s ease-in-out",
        }}
      >
        <CardMedia
          component="img"
          src={yglogo}
          height="25em"
          width="25em"
          sx={{ objectFit: "contain" }}
        />
      </Box>
    </Box>
  );
};

export default LoadingScreen;
