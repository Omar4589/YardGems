//---------------------------IMPORTS--------------------------------//
import React, { useState } from "react";
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
import ListingModalComponent from "../ListingModal/ListingModalComponent";

//---------------------------START OF COMPONENT----------------------//
export default function AllListings() {
  //Here we destructure the context from 'useListingContext',
  //in this case, the context is the 'listings' that we query using GraphQL in 'ListingsContext.js'  *the loggedInUser's info is also available to be destructed*
  const { listings, setListings } = useListingContext();

  //---------STATES--------//
  //State for 'Please login' pop over; We set the initial state to false to hide the popOver
  //this pop over populates when a user clicks on a listing to favorite it, but theyre not logged in
  const [loginPopOver, setLoginPopOver] = useState(false);

  //State for listing modal that displays listing information
  //We set the intial state to 'false' to hide the component
  const [listingModal, setListingModal] = useState(false);

  //-----MODAL HANDLERS------//

  //Opens modal when listings is clicked on
  const openModal = (listing) => setListingModal(listing);
  //Closes modal when listings is clicked on
  const closeModal = () => setListingModal(false);

  //Closes pop over message - 'Please log in'
  const closePopOver = () => setLoginPopOver(false);

  //---------------------------RETURN STATEMENT-------------------------//
  return (
    <Container sx={styles.container}>
      <Grid spacing={6} sx={styles.grid}>
        {listings.map((listing) => {
          return (
            <Card component="div" sx={{}}>
              <CardActionArea onClick={() => openModal(listing)}>
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
                <IconButton
                  onClick={() => setLoginPopOver(true)}
                  sx={styles.iconButton}
                  aria-label="favorite"
                >
                  <FavoriteIcon sx={{ color: "grey" }} />
                </IconButton>
              )}
              <Popover
                open={loginPopOver}
                onClose={closePopOver}
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
      {/* Below is a conditional expression that checks whether the listingModal variable is truthy. If the value of listingModal is truthy 
      (not null, undefined, false, 0, or an empty string), the code inside the parentheses (...) will be executed.  */}
      {listingModal && (
        <ListingModalComponent
          listingModal={listingModal}
          closeModal={closeModal}
          image={image}
        />
      )}
    </Container>
  );
}
