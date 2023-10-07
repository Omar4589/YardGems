//---------------------------IMPORTS--------------------------------//
import React, { useState } from "react";
import {
  Container,
  Card,
  Box,
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
import styles from "./styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Auth from "../../utils/auth";
import { useListingContext } from "../../utils/ListingContext";
import ListingModalComponent from "../ViewListingModal/ListingModalComponent";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// settings for react-slick's Slider component
const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

//---------------------------START OF COMPONENT----------------------//
export default function AllListings() {
  //Here we destructure the context from 'useListingContext',
  const {
    listings,
    favoriteAListing,
    unfavoriteAListing,
    favoritedListingIds,
  } = useListingContext();

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
    <Container id="all-listings" sx={{ ...styles.main }}>
      <Typography sx={{ ...styles.heading }}> Yard Sale Listings</Typography>
      <Typography sx={{ ...styles.results }}>
        {listings.length + " Results"}
      </Typography>
      <Grid
        id="all-listings-grid"
        container
        spacing={2}
        sx={{ ...styles.grid }}
      >
        {listings.map((listing) => {
          return (
            <Grid xs={12} md={6} id="listing-grid">
              <Card
                id="listing-card"
                component="div"
                sx={{ ...styles.listingCard }}
              >
                <CardActionArea onClick={() => openModal(listing)}>
                  <CardHeader
                    title={listing.title}
                    subheader={`Listed by: ${listing.author}`}
                  />
                  <Slider {...settings}>
                    {/* First we check if the array 'images' is empty, if it is, we use the default hardcoded image */}
                    {listing.images.length > 0 ? (
                      listing.images.map((url, index) => (
                        <div key={index}>
                          <img
                            src={url}
                            alt={`slide-${index}`}
                            style={{ ...styles.img }}
                          />
                        </div>
                      ))
                    ) : (
                      <div>
                        <img
                          src={image}
                          alt="Default slide"
                          style={{ ...styles.img }}
                        />
                      </div>
                    )}
                  </Slider>
                  <CardContent component="div">
                    <Typography>Date Of Sale: {listing.dateOfSale}</Typography>
                    <Typography>{listing.address}</Typography>
                  </CardContent>
                </CardActionArea>
                {Auth.loggedIn() ? (
                  <IconButton
                    onClick={() => {
                      if (favoritedListingIds.has(listing._id)) {
                        unfavoriteAListing(listing._id);
                      } else {
                        favoriteAListing(listing._id);
                      }
                    }}
                    sx={{
                      ...styles.iconButton,

                      color: favoritedListingIds.has(listing._id)
                        ? "red"
                        : "grey",
                    }}
                    aria-label="favorite"
                  >
                    <FavoriteIcon />
                  </IconButton>
                ) : (
                  <IconButton
                    onClick={() => setLoginPopOver(true)}
                    sx={{ ...styles.iconButton }}
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
            </Grid>
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
