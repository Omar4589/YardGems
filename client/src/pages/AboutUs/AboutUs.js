import React from "react";
import { Box, Typography } from "@mui/material";

const AboutUs = () => {
  return (
    <Box sx={{ mx: "auto", px: 3, py: 5, backgroundColor: "#e8f5e9" }}>
      <Typography sx={{ mb: 3, fontSize: 30 }}>About Us</Typography>
      <Typography sx={{ mb: 4, fontSize:20  }}>
        Welcome to YardGems, the ultimate online platform for yard and garage
        sale enthusiasts. Our mission is to revolutionize the way people
        discover and explore nearby sales, making the process simple, exciting,
        and rewarding for everyone. We believe that the thrill of finding unique
        treasures shouldn't be limited to chance encounters but should be easily
        accessible to all.{" "}
      </Typography>

      <Typography sx={{ mb: 4 }}>
        At YardGems, we understand the joy of stumbling upon that one-of-a-kind
        item and the excitement of connecting with sellers in your community. We
        aim to bring people together, creating a vibrant marketplace where
        buyers and sellers can interact, share their passions, and uncover
        hidden gems.{" "}
      </Typography>

      <Typography sx={{ mb: 4 }}>
        Our dedicated team is committed to providing a seamless and
        user-friendly experience. We continuously strive to improve our platform
        based on valuable feedback from our growing community of users. Your
        satisfaction and enjoyment are at the heart of everything we do.{" "}
      </Typography>

      <Typography sx={{ mb: 4 }}>
        {" "}
        We believe that yard and garage sales offer more than just an
        opportunity to buy and sell goods. They foster a sense of community,
        spark conversations, and allow people to connect over shared interests.
        YardGems aims to capture and enhance this sense of community by
        providing a centralized hub where enthusiasts can come together,
        exchange stories, and embark on exciting sale adventures.{" "}
      </Typography>

      <Typography sx={{ mb: 4 }}>
        {" "}
        By making it easier than ever to discover nearby sales, save your
        favorite finds, and connect with sellers, YardGems empowers you to
        explore and experience the joy of yard and garage sales to the fullest.
        We firmly believe that a well-planned sale excursion can lead to
        incredible discoveries, significant savings, and a healthier, more
        sustainable lifestyle.{" "}
      </Typography>

      <Typography sx={{ mb: 12 }}>
        {" "}
        Thank you for choosing YardGems and becoming part of our growing
        community. Together, let's unlock the hidden treasures waiting to be
        found in your neighborhood and beyond. Happy hunting!
      </Typography>
    </Box>
  );
};

export default AboutUs;
