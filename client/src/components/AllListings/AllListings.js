import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POSTS, USER_QUERY } from "../../utils/queries";

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
import { ADD_FAVORITES } from "../../utils/mutations";

//---------Start of component-----//
const AllListings = () => {
  //---------STATES--------//

  //State for Listings
  const [listings, setListings] = useState([]);

  //console.log(listings)

  //State for user favorites
  const [userFavorites, setUserFavorites] = useState([]);

  //State for 'Please login' pop over
  //populates when a user clicks on a listing to favorite it, but theyre not logged in
  const [popOver, setPopOver] = useState(false);

  //State for card modal
  const [selectedCardId, setSelectedCardId] = useState(null);

  //------QUERIES-----//

  const { data: allListingsData } = useQuery(QUERY_POSTS);
  const { loading, data: loggedInUserData } = useQuery(USER_QUERY);

  //Variable that holds all listings, an array of objects containing listings props
  const allListings = allListingsData?.allPost || [];
  //console.log(allListings);

  const loggedInUser = loggedInUserData?.me || [];
  //console.log(loggedInUser)


  //-----------MUTATIONS----------//
  const [addFavorites, { error }] = useMutation(ADD_FAVORITES);

  //This function handles adding post to user's 'savedFavorites'
  const addToFavorites = async (_id) => {
    //console.log(_id);
    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      const { data } = await addFavorites({ variables: { postId: _id } });

      // Toggle the favorite status by adding or removing the post ID
      if (userFavorites.includes(_id)) {
        setUserFavorites(userFavorites.filter((id) => id !== _id));
      } else {
        setUserFavorites([...userFavorites, _id]);
      }
    } catch (err) {
      console.error(err);
    }
  };

  //This useEffect hook updates the listings state to render any
  //new listings that are added
  useEffect(() => {
    setListings(allListings);
  }, []);

  // const AllListingsDataWithFavorites = allListings.map((post) => ({
  //   ...post,
  //   isFavorited: userFavorites.includes(post._id),
  // }));

  //console.log(AllListingsDataWithFavorites);

  //Opens modal when listings is clicked on
  const openModal = (post) => setSelectedCardId(post);
  //Closes modal when listings is clicked on
  const closeModal = () => setSelectedCardId(false);

  //Closes pop over message - 'Please log in'
  const closePopOver = () => setPopOver(false);

  return (
    <>
      <Container
        sx={{
          maxHeight: "100vh",
          overflow: "auto",
          backgroundColor: "#e8f5e9",
        }}
      >
        <Grid spacing={6} sx={{ paddingTop: "5%", paddingBottom: "100%" }}>
          {allListings.map((post) => {
            return (
              <Card component="div" sx={{}}>
                <CardActionArea onClick={() => openModal(post)}>
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
                    onClick={() => {
                      addToFavorites(post._id);
                    }}
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
                    onClick={() => setPopOver(true)}
                    sx={{ marginLeft: "75%" }}
                    aria-label="favorite"
                  >
                    <FavoriteIcon sx={{ color: "grey" }} />
                  </IconButton>
                )}
                <Popover
                  open={popOver}
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
        {selectedCardId && (
          <Modal
            open={Boolean(selectedCardId)}
            onClose={closeModal}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={styles.modalPopUp}>
              <Card component="div" sx={{ maxWidth: "100%" }}>
                <CardHeader
                  title={selectedCardId.postName}
                  subheader={`Post By: ${selectedCardId.postAuthor}`}
                />
                <CardMedia
                  sx={{ height: 140, paddingTop: "56.2%" }}
                  image={image}
                />
                <CardContent component="div">
                  <Typography component="span" gutterBottom variant="h5">
                    Date Of Event: {selectedCardId.dateOfSale}
                  </Typography>
                  <Typography
                    component="div"
                    variant="body2"
                    color="text.secondary"
                  >
                    {selectedCardId.postDescription}
                    <Typography
                      component="div"
                      variant="body2"
                      color="text.secondary"
                    >
                      <br></br>
                      {selectedCardId.address}
                    </Typography>
                  </Typography>
                </CardContent>
              </Card>
            </Box>
          </Modal>
        )}
        {/* END OF MODAL */}
      </Container>
    </>
  );
};

export default AllListings;
