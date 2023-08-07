//---------------------------IMPORTS--------------------------------//
import React, { useState, useEffect } from "react";
import {
  Container,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardHeader,
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

//---------------------------START OF COMPONENT----------------------//
export default function AllListings() {
  // Here we destructure the context from useListingContext, in this case,
  //it is the listings that we query using GraphQL and the loggedInUser's info.
  const { listings, loggedInUser } = useListingContext();

  //---------------------------RETURN STATEMENT-------------------------//
  return (
    <Container sx={styles.container}>
      <Grid spacing={6} sx={styles.grid}>
        {listings.map((listing) => {
          return (
            <Card component="div" sx={{}}>
              <CardActionArea>
                <CardHeader
                  title={listing.title}
                  subheader={`Listed by: ${listing.author}`}
                />
                <CardMedia sx={styles.cardMedia} image={image} />
                <CardContent component="div">
                  <Typography>Date Of Event: {listing.dateOfSale}</Typography>
                  <Typography>{listing.address}</Typography>
                </CardContent>
              </CardActionArea>
              {/* Use the "isFavorited" property to set the color of the heart icon */}
              {Auth.loggedIn() ? (
                <IconButton
                  sx={
                    (styles.iconButton,
                    { color: listing.isFavorited ? "red" : "grey" }) // Set the color based on "isFavorited"
                  }
                  aria-label="favorite"
                >
                  <FavoriteIcon />
                </IconButton>
              ) : (
                <IconButton sx={styles.iconButton} aria-label="favorite">
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
