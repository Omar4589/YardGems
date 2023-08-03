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

const AllListings = () => {
  const [userFavorites, setUserFavorites] = useState([]);

  //Here we create a state for the popOver that populates when a user clicks on a listing
  //to favorite it, but theyre not logged in
  const [popOver, setPopOver] = useState(false);

  //Here we query all listings so we can then display them on the page
  const { data: allPostsData } = useQuery(QUERY_POSTS);
  const { data: userData } = useQuery(USER_QUERY);

  // console.log(userData.me)
  //Variable that holds all listings
  const AllListingsData = allPostsData?.allPost || [];
  // console.log(AllListingsData);

  useEffect(() => {
    if (userData?.me) {
       // Extract the savedFavorites array from the user data
       const userFavorites = userData.me.savedFavorites || [];
       // Update the userFavorites state
       setUserFavorites(userFavorites);
    } else {
      setUserFavorites([]);
    }
  }, [userData]);

  const AllListingsDataWithFavorites = AllListingsData.map((post) => ({
    ...post,
    isFavorited: userFavorites.includes(post._id),
  }));

  console.log(AllListingsDataWithFavorites);


  // to see if a card was selected
  const [selectedCardId, setSelectedCardId] = useState(null);

  const [addFavorites, { error }] = useMutation(ADD_FAVORITES);

  // handles the modal to pop up when a certain card is selected
  const handleOpen = (post) => setSelectedCardId(post);
  const handleClose = () => setSelectedCardId(false);

  // handles the favorite button to close when screen is clicked on
  const handleClosePop = () => setPopOver(false);

  const addToFavorites = async (_id) => {
    console.log(_id);
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
          {AllListingsDataWithFavorites.map((post) => {
            return (
              <Card component="div" sx={{}}>
                <CardActionArea onClick={() => handleOpen(post)}>
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
                  onClose={handleClosePop}
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
        {/* below is the modal  */}
        {selectedCardId && (
          <Modal
            open={Boolean(selectedCardId)}
            onClose={handleClose}
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
      </Container>
    </>
  );
};

export default AllListings;
