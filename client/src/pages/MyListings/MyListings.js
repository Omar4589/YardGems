//-----------------IMPORTS-----------------------//
import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { ME_QUERY } from "../../utils/queries";
import { REMOVE_LISTING } from "../../utils/mutations";
import {
  Container,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardActions,
  CardHeader,
  Grid,
  Button,
} from "@mui/material";
import { ButtonComponent } from "../../components/CreateListingModal/Button";
import { CreateListingModal } from "../../components/CreateListingModal/ListingModal";
import image from "../../assets/yardsale.jpg"; // hard coding for now
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import AdditionalFeatures from "../AdditionalFeatures/AdditionalFeatures";

//-----------------------START OF COMPONENT-----------------------//
const MyListings = () => {
  //-----------------STATE---------------//
  //Here we create a state called 'listings' to track all listings being shown on the page
  const [listings, setListings] = useState([]);

  //Here we create a state for the modal called 'isModalOpen', we set the initial state to 'false'
  //We use a boolean value to display and hide the modal. false = hidden , true = modal appears 
  //The user uses this modal to create a new listings
  const [isModalOpen, setIsModalOpen] = useState(false);

  //-----------------QUERIES--------------//
  //Here we are use the user query that returns the logged in users data
  const { loading, data } = useQuery(ME_QUERY);

  //Here we extract the data from the above query
  const userData = data?.me || [];

  //-----------------HOOKS-----------------//
  //this useEffect hook handles updating the listings state when the data from the query is updated
  useEffect(() => {
    const userListings = userData?.userPosts || [];

    setListings(userListings);
  }, [userData.userPosts]);

  //-----------------MUTATIONS------------//
  //Here we are setting a mutation called 'removeListing' , this mutations deletes a listing from the database
  //We use the 'useMutation' hook and pass in the 'REMOVE_LISTING' mutation that we imported
  const [removeListing, { error }] = useMutation(REMOVE_LISTING);

  //Here we define a function named 'deleteListing' that removes a user's listing from the database, it takes in a listing's id
  //We invoke this function when a user clicks on the 'delete' button
  const deleteListing = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      //Here we call the removeListing mutation
      const listing = await removeListing({
        variables: { listingId: _id },
        //We use the 'update' function to update the cache , this causes a rerender which eliminates the need to include the setListings setter
        update: (cache, { data: { removeListing } }) => {
          // Read the existing cached data for the current user
          const cachedData = cache.readQuery({ query: ME_QUERY });

          // Filter out the deleted post from the cached userPosts
          const updatedUserPosts = cachedData.me.userPosts.filter(
            (listing) => listing._id !== _id
          );

          // Update the cached data without the deleted post
          cache.writeQuery({
            query: ME_QUERY,
            data: {
              me: {
                ...cachedData.me,
                userPosts: updatedUserPosts,
              },
            },
          });
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  //----------MODAL HANDLERS ---------\\
  //Here we define two functions, one displays the modal the other hides the modal
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  //Below we define a variable that holds the user's listings sorted from latest to oldest called 'sortedUserPosts'
  //If listings is truthy (not null, undefined, or an empty array), it proceeds with the sorting process. 
  //If listings is falsy (null, undefined, or an empty array), it assigns an empty array [].
  //The slice method creates a shallow copy of the listings array. Sort() mutates the array it operates on, avoiding the modification of the original array.
  //The function used by the sort() method takes two elements, a and b, from the array and compares them based on the 'createdAt' property. 
  //Read more about the sort() method at https://www.w3schools.com/jsref/jsref_sort.asp
  //The localeCompare() method is used to compare the strings in a way that respects the natural order of characters in different languages.
  const sortedUserPosts = listings
    ? listings.slice().sort((a, b) => {
        return b.createdAt.localeCompare(a.createdAt);
      })
    : [];

  return (
    <>
      {Auth.loggedIn() ? (
        <Container maxWidth="xl" sx={{ backgroundColor: "#e8f5e9" }}>
          <Container maxWidth="md">
            <Typography
              component="div"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ fontSize: "3rem" }}
            >
              {listings.length
                ? `You have ${listings.length} garage sale ${
                    listings.length === 1 ? "listing" : "listings"
                  }:`
                : "You have no saved listings!"}
            </Typography>
            {/* button is the create new listing button to open modal, passing a prop that handles a function */}
            <ButtonComponent openModal={handleOpenModal} />
            {/* this is the modal to create a new listing, give is a state of false, pass the prop handleCloseModal and a state to open/close the modal */}
            <CreateListingModal
              handleOpen={isModalOpen}
              handleClose={handleCloseModal}
              listings={listings}
              setListings={setListings} // Pass the setPosts function to FormModal
            />
          </Container>
          <Container sx={{ marginBottom: "3em" }}>
            <Grid container spacing={4}>
              {sortedUserPosts.map((post) => {
                return (
                  <Grid key={post._id} item xs={12} sm={6} md={4}>
                    <Card
                      component="div"
                      sx={{ maxWidth: 500, marginBottom: "2em" }}
                    >
                      <CardHeader
                        title={post.title}
                        subheader={post.createdAt}
                      />
                      <CardMedia
                        sx={{ height: 140, paddingTop: "56.2%" }}
                        image={image}
                        title="green iguana"
                      />
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
                          onClick={() => deleteListing(post._id)}
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
