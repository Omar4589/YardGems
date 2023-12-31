//-----------------IMPORTS-----------------------//
import React, { useState } from "react";
import {
  Container,
  Card,
  Typography,
  CardContent,
  CardActions,
  CardHeader,
  Grid,
  Button,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { CreateListingModal } from "../../components/CreateListingModal/ListingModal";
import image from "../../assets/yardsale.jpg"; // hard coding for now
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import AdditionalFeatures from "../AdditionalFeatures/AdditionalFeatures";
import { useListingContext } from "../../utils/ListingContext";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styles from "./styles";

// settings for react-slick's Slider component
const settings = {
  dots: true,
  infinite: true,
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
};

//-----------------------START OF COMPONENT-----------------------//
const MyListings = () => {
  //destructuring from ListingContext
  const { userListings, setUserListings, removeAListing, addAListing } =
    useListingContext();

  //Here we create a state for the modal called 'isModalOpen', we set the initial state to 'false'
  //We use a boolean value to display and hide the modal. false = hidden , true = modal appears
  //The user uses this modal to create a new listings
  const [isModalOpen, setIsModalOpen] = useState(false);

  //----------MODAL HANDLERS ---------\\
  //Here we define two functions, one displays the modal the other hides the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //Below we define a variable that holds the user's listings from latest to oldest called 'sortedUserPosts'
  //The slice method creates a shallow copy of the listings array. Sort() mutates the array it operates on, avoiding the modification of the original array.
  //The function used by the sort() method takes two elements, a and b, from the array and compares them based on the 'createdAt' property.
  //Read more about the sort() method at https://www.w3schools.com/jsref/jsref_sort.asp
  //The localeCompare() method is used to compare the strings in a way that respects the natural order of characters in different languages.
  const sortedUserPosts = userListings
    ? userListings.slice().sort((a, b) => {
        return b.createdAt.localeCompare(a.createdAt);
      })
    : [];

  return (
    <>
      {Auth.loggedIn() ? (
        <Container
          maxWidth=""
          sx={{
            backgroundColor: "#e8f5e9",
            paddingBottom: "6em",
            minHeight: "100vh",
          }}
        >
          <Container maxWidth="md">
            <Typography align="center" sx={{ ...styles.heading }}>
              {userListings.length
                ? `You have ${userListings.length} yard sale ${
                    userListings.length === 1 ? "listing" : "listings"
                  }:`
                : "You have no saved listings!"}
            </Typography>
            {/* button is the create new listing button to open modal, passing a prop that handles a function */}
             <Button
        sx={{...styles.button}}
        onClick={handleOpenModal}
        variant="contained"
        endIcon={<AddIcon />}
      >
        Create New Listing
      </Button>
            {/* this is the modal to create a new listing, give is a state of false, pass the prop handleCloseModal and a state to open/close the modal */}
            <CreateListingModal
              handleOpen={isModalOpen}
              handleClose={handleCloseModal}
              listings={userListings}
              setListings={setUserListings}
              addListing={addAListing}
            />
          </Container>
          <Container sx={{ marginBottom: "3em", marginTop: "1em" }}>
            <Grid container spacing={2}>
              {sortedUserPosts.map((post) => {
                return (
                  <Grid key={post._id} item xs={12} sm={6} md={4} sx={{}}>
                    <Card
                      component="div"
                      sx={{
                        maxWidth: 500,
                        marginBottom: "2em",
                        minHeight: "500px",
                      }}
                    >
                      <CardHeader
                        title={post.title}
                        subheader={post.createdAt}
                      />
                      <Slider {...settings}>
                        {/* First we check if the array 'images' is empty, if it is, we use the default hardcoded image */}
                        {post.images?.length > 0 ? (
                          post.images.map((url, index) => (
                            <div key={`${post._id}-image-${index}`}>
                              <img
                                src={url}
                                alt={`slide-${index}`}
                                style={{ height: "250px", margin: "auto" }}
                              />
                            </div>
                          ))
                        ) : (
                          <div>
                            <img
                              src={image}
                              alt="Default slide"
                              style={{ height: "250px", margin: "auto" }}
                            />
                          </div>
                        )}
                      </Slider>

                      <CardContent component="div">
                        <Typography component="span" gutterBottom variant="h5">
                          Date Of Event: {post.dateOfSale}
                        </Typography>
                        <Typography
                          component="div"
                          variant="body2"
                          color="text.secondary"
                        >
                          {post.description}
                          <Typography
                            component="div"
                            variant="body2"
                            color="text.secondary"
                          >
                            {post.address}
                          </Typography>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Link to={`/listings/${post._id}`}>
                          <Button
                            size="small"
                            color="primary"
                            variant="outlined"
                            style={{ marginRight: "1em" }}
                          >
                            Edit
                          </Button>
                        </Link>
                        <Button
                          onClick={() => removeAListing(post._id)}
                          size="small"
                          color="error"
                          variant="outlined"
                        >
                          Delete
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Container>
        </Container>
      ) : (
        <AdditionalFeatures />
      )}
    </>
  );
};

export default MyListings;
