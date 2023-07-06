import React, { useState, useEffect } from "react";
import { Box, Link, Typography } from "@mui/material";
import styles from "./styles";
import appName from "../../assets/images/appName.jpg";

const Footer = () => {
  // Here we create a variable 'showFooter' and use State to set the value to true.
  //the function responsible for setting the state for this variable is 'setShowFooter'
  const [showFooter, setShowFooter] = useState(true);

  // The `useEffect` hook is used to add event listeners and perform side effects.
  useEffect(() => {
    //This function updates the value of showFooter based on the window width.
    const handleResize = () => {
      //Here we are setting the value by passing in the value of the expression
      //'is my window's innerWidth greater than 768 right now? true or false
      setShowFooter(window.innerWidth > 768);
    };

    //Here we create an event listener for the window's resize event, and pass `handleResize` as the event handler.
    window.addEventListener("resize", handleResize);

    //Here we call `handleResize` on the initial mount to set the initial value of `showFooter`.
    handleResize();

    //Here we define a 'cleanup' function that removes the resize event listener
    const cleanup = () => {
      window.removeEventListener("resize", handleResize);
    };

    // Clean up the event listener by removing it when the component is unmounted.
    return cleanup;
  }, []);

  // If `showFooter` is false, the component returns `null`, indicating that the footer should not be rendered.
  if (!showFooter) {
    return null;
  }

  return (
    <footer style={styles.footerMain}>
      <Box sx={{ ...styles.logo }}>
        <img src={appName} width="150" height="27" alt="green_gem" />
      </Box>
      <Box>
        <Typography sx={{ ...styles.copy }}>
          &copy; 2023 YardGems. All rights reserved.
        </Typography>
        <Box sx={{ paddingTop: 1 }}>
          <Link to="/AboutUs" sx={{ ...styles.links }}>
            About Us
          </Link>
          <Link to="/contact" sx={{ ...styles.links }}>
            Contact
          </Link>
          <Link to="/faq" sx={{ ...styles.links }}>
            FAQ
          </Link>
        </Box>
      </Box>
    </footer>
  );
};

export default Footer;
