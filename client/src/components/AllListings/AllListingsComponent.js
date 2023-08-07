import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardHeader,
  Modal,
  Box,
  IconButton,
  Popover,
  CardActionArea,
} from "@mui/material";
import Grid from "@mui/material/Unstable_Grid2";
import image from "../../assets/yardsale.jpg"; // hard coding for now
import { styles } from "./styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Auth from "../../utils/auth";

import { useListingContext } from "../../utils/ListingContext";

export default function AllListings() {
  // Assign student related variables from our custom hook
  const { listings, loggedInUser } = useListingContext();

  console.log(listings);

  return (
    <Container
      sx={{
        maxHeight: "100vh",
        overflow: "auto",
        backgroundColor: "#e8f5e9",
      }}
    >
      <Grid spacing={6} sx={{ paddingTop: "5%", paddingBottom: "100%" }}>
        {listings.map((post) => {
          return (
            <Card component="div" sx={{}}>
              <CardActionArea >
                <CardHeader
                  title={post.postName}
                  subheader={`Listed by: ${post.postAuthor}`}
                />
                <CardMedia
                  sx={{ height: 140, paddingTop: "56.2%" }}
                  image={image}
                />
                <CardContent component="div">
                  <Typography>Date Of Event: {post.dateOfSale}</Typography>
                  <Typography>{post.address}</Typography>
                </CardContent>
              </CardActionArea>
              {/* Use the "isFavorited" property to set the color of the heart icon */}
              {Auth.loggedIn() ? (
                <IconButton
                 
                  sx={{
                    marginLeft: "75%",
                    color: post.isFavorited ? "red" : "grey", // Set the color based on "isFavorited"
                  }}
                  aria-label="favorite"
                >
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <IconButton
                  
                  sx={{ marginLeft: "75%" }}
                  aria-label="favorite"
                >
                  <FavoriteIcon sx={{ color: "grey" }} />
                </IconButton>
              )}
              <Popover
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
              >
                <Typography sx={{ p: 2 }}>
                  You need to be logged in to save this listing
                </Typography>
              </Popover>
            </Card>
          );
        })}
      </Grid>
    </Container>
  );
}
