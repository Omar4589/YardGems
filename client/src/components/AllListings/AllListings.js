import React, { useState } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_POSTS } from "../../utils/queries";
import {
  Container,
  Card,
  CardMedia,
  Typography,
  CardContent,
  CardHeader,
  Grid,
  Modal,
  Box,
  IconButton,
  Popover,
  CardActionArea,
} from "@mui/material";
import image from "../../assets/yardsale.jpg"; // hard coding for now
import { styles } from "./styles";
import FavoriteIcon from "@mui/icons-material/Favorite";
import Auth from "../../utils/auth";
import { ADD_FAVORITES } from "../../utils/mutations";
import { useNavigate } from "react-router-dom";


const AllListings = () => {
  const [popOver, setPopOver] = useState(false);
  const { data, refetch } = useQuery(QUERY_POSTS);
  const AllListingsData = data?.allPost || [];

  const [clickedHearts, setClickedHearts] = useState({}); // set the initial state of hearts (which is false since none have been clicked yet). it is an object because it holds the key values(the card id) of EACH cards and a boolean if they have been clicked or not
  const handleClick = (postId) => {
    // grab the postID of the card that is being clicked
    setClickedHearts((prevClickedHearts) => ({
      // calls the  INITIAL state and CHECKS if the prevClickedHearts have been clicked (true or false)
      ...prevClickedHearts, // prevClickedHearts equals useStatee({}) - it is the object of keys and true/false (example => postID: false -- this is the default state of all the posts)
      [postId]: true, // once heart is clicked, this new key value pair is added
    }));
  };

  const navigate = useNavigate();

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
      navigate("/", { replace: true });
      window.location.href = window.location.href;
      refetch();
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
        <Grid
          container
          spacing={2}
          sx={{ paddingTop: "1.3em", paddingBottom: "1.3em" }}
        >
          {AllListingsData.map((post) => {
            const isClicked = clickedHearts[post._id] || false; // is it true or false for clicking on the heart, clickedHearts is an object of array with the key values from
            return (
              <Grid key={post._id} item xs={12} sm={10} md={6}>
                <Card component="div" sx={{ maxWidth: 500 }}>
                  <CardActionArea onClick={() => handleOpen(post)}>
                    <CardHeader
                      title={post.postName}
                      subheader={`Post By: ${post.postAuthor}`}
                    />
                    <CardMedia
                      sx={{ height: 140, paddingTop: "56.2%" }}
                      image={image}
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
                        {post.address}
                      </Typography>
                    </CardContent>
                  </CardActionArea>
                  {Auth.loggedIn() ? (
                    <IconButton
                      onClick={() => {
                        addToFavorites(post._id);
                        handleClick(post._id);
                      }}
                      sx={{
                        marginLeft: "85%",
                        color: isClicked ? "red" : "grey",
                      }}
                      aria-label="favorite"
                    >
                      <FavoriteIcon />
                    </IconButton>
                  ) : (
                    <IconButton
                      onClick={() => setPopOver(true)}
                      sx={{ marginLeft: "85%" }}
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
              </Grid>
            );
          })}
        </Grid>
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
