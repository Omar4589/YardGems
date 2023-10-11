import React, { useEffect } from "react";
import { Box, CardMedia } from "@mui/material";
import yglogo from "../../assets/images/yargemsloadingscreenlogo.png";

const LoadingScreen = () => {
  useEffect(() => {
    const element = document.getElementById("loadingBox");
    setTimeout(() => {
      element.style.transform = "scale(0)";
    }, 1000); // Start the transition after 2.5 seconds
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
      zIndex={9999}
      bgcolor="transparent"
    >
      <Box
        id="loadingBox"
        display="flex"
        justifyContent="center"
        alignItems="center"
        width={200} // Fixed width
        height={200} // Fixed height
        bgcolor="#ffffff"
        sx={{
          borderRadius: "100%",
          transform: "scale(10)", // Start with scale 5
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
