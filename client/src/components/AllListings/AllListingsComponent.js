//---------------------------IMPORTS--------------------------------//
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
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
import ListingModalComponent from "../ViewListingModal/ListingModalComponent";
import { ADD_FAVORITES } from "../../utils/mutations";

//---------------------------START OF COMPONENT----------------------//
export default function AllListings() {
  //Here we destructure the context from 'useListingContext',
  //in this case, the context is the 'listings' that we query using GraphQL in 'ListingsContext.js'  *the loggedInUser's info is also available to be destructed*
  const {
    listings,
    setListings,
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
  console.log("-----All Listings with isFavorited property");
  console.log(listings);
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
              {Auth.loggedIn() ? (
                <IconButton
                  onClick={() => {
                    if (favoritedListingIds.has(listing._id)) {
                      unfavoriteAListing(listing._id);
                    } else {
                      favoriteAListing(listing._id);
                    }
                  }}
                  sx={
                    (styles.iconButton,
                    {
                      color: favoritedListingIds.has(listing._id)
                        ? "red"
                        : "grey",
                    })
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

// //-----------MUTATIONS----------//
// //This mutation handles adding a listing to the logged in user's savedFavorites array
// const [addFavorites] = useMutation(ADD_FAVORITES);

// //This function handles adding a listing to user's 'savedFavorites' by calling
// //the 'addFavorites' mutation; this mutation has logic that removes a listing from 'savedFavorites' if it's already there, checkout resolvers.js in server side
// const addToFavorites = async (_id) => {
//   const token = Auth.loggedIn() ? Auth.getToken() : null;

//   if (!token) {
//     return false;
//   }

//   try {
//     //invoke mutation
//     const { data } = await addFavorites({ variables: { listingId: _id } });

//     // Here we map over the each listing and check if the id of the listing we are mutating matches the listig id we are mapping over
//     //if the listing id's match, we then set the isFavorited property of that listing to the opposite boolean value that it is currently has
//     //this essentially toggles between 'true' and 'false'
//     const updatedListings = listings.map((listing) =>
//       listing._id === _id
//         ? { ...listing, isFavorited: !listing.isFavorited }
//         : listing
//     );
//     //update listings state with the updatedListings array, this array includes an update to the isFavorited property of each listing
//     setListings(updatedListings);
//   } catch (err) {
//     console.error(err);
//   }
// };
