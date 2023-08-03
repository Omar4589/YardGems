import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { USER_QUERY } from "../../utils/queries";
import { REMOVE_POST } from "../../utils/mutations";
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
import { ButtonComponent } from "../../components/DashboardModal/Button";
import { FormModal } from "../../components/DashboardModal/DashboardModal";
import image from "../../assets/yardsale.jpg"; // hard coding for now
import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import AdditionalFeatures from "../AdditionalFeatures/AdditionalFeatures";

const MyListings = () => {
  //Here we are use the user query that returns the logged in users data
  const { loading, data } = useQuery(USER_QUERY);

  //Here we extract the data from the above query
  const userData = data?.me || [];

  console.log(userData);

  //Here we create a state to track all listings being shown on the page
  const [listings, setListings] = useState(userData.userPosts || []);

  console.log(listings);

  //this useEffect hook handles updating the listings state when the data from the query is updated
  useEffect(() => {
    if (data && data.me) {
      setListings(data.me.userPosts);
    }
  }, [data]);

  //Here we create a state for the modal , we set it to false because we start with it closed
  //True means the modal is displayed on the page
  const [isModalOpen, setIsModalOpen] = useState(false);

  //Here we are setting the mutation that deletes a post
  const [removePost, { error }] = useMutation(REMOVE_POST);

  //----------functions to handle the CREATE listing modal ---------\\
  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  //----------functions to handle the DELETE listing ---------\\

  const deletePostSubmit = async (_id) => {
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      const { removedPost } = await removePost({
        variables: { postId: _id },
        update: (cache, { data: { removePost } }) => {
          // Read the existing cached data for the current user
          const cachedData = cache.readQuery({ query: USER_QUERY });

          // Filter out the deleted post from the cached userPosts
          const updatedUserPosts = cachedData.me.userPosts.filter(
            (post) => post._id !== _id
          );

          // Update the cached data without the deleted post
          cache.writeQuery({
            query: USER_QUERY,
            data: {
              me: {
                ...cachedData.me,
                userPosts: updatedUserPosts,
              },
            },
          });
            //   // Update the local state
        setListings(updatedUserPosts);
        },
      });
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) {
    return <h2>LOADING...</h2>;
  }

  //sortedUserPosts contains all posts sorted from most recent to oldest
  //the slice method returned a copy of an array, we use sort to sort the copied array
  const sortedUserPosts = userData.userPosts.slice().sort((a, b) => {
    // Here we use the localeCompare method to compare both time strings first by date and then by time
    return b.createdAt.localeCompare(a.createdAt);
  });
  
  
  return (
    <>
      {Auth.loggedIn() ? (
        <Container maxWidth="xl" sx={{ backgroundColor: "#e8f5e9", }}>
          <Container maxWidth="md">
            <Typography
              component="div"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ fontSize: "3rem" }}
            >
              {userData.userPosts.length
                ? `You have ${userData.userPosts.length} garage sale ${
                    userData.userPosts.length === 1 ? "listing" : "listings"
                  }:`
                : "You have no saved listings!"}
            </Typography>
            {/* button is the create new listing button to open modal, passing a prop that handles a function */}
            <ButtonComponent openModal={handleOpenModal} />
            {/* this is the modal to create a new listing, give is a state of false, pass the prop handleCloseModal and a state to open/close the modal */}
            <FormModal
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
                        title={post.postName}
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
                          {post.postDescription}
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
                          onClick={() => deletePostSubmit(post._id)}
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
