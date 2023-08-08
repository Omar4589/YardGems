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
  Modal,
  Box,
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
  const { listings, setListings } = useListingContext();

  //---------STATES--------//

  //State for 'Please login' pop over
  //populates when a user clicks on a listing to favorite it, but theyre not logged in
  const [loginPopOver, setLoginPopOver] = useState(false);

  //State for card modal
  const [listingModal, setListingModal] = useState(null);

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

      {/* MODAL BELOW */}
      {listingModal && (
        <Modal
          open={Boolean(listingModal)}
          onClose={closeModal}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={styles.modalPopUp}>
            <Card component="div" sx={{ maxWidth: "100%" }}>
              <CardHeader
                title={listingModal.title}
                subheader={`Post By: ${listingModal.author}`}
              />
              <CardMedia
                sx={{ height: 140, paddingTop: "56.2%" }}
                image={image}
              />
              <CardContent component="div">
                <Typography component="span" gutterBottom variant="h5">
                  Date Of Event: {listingModal.dateOfSale}
                </Typography>
                <Typography
                  component="div"
                  variant="body2"
                  color="text.secondary"
                >
                  {listingModal.description}
                  <Typography
                    component="div"
                    variant="body2"
                    color="text.secondary"
                  >
                    <br></br>
                    {listingModal.address}
                  </Typography>
                </Typography>
              </CardContent>
            </Card>
          </Box>
        </Modal>
      )}
      {/* END OF MODAL */}
    </Container>
  );
}
