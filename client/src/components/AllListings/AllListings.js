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
  //Here we create a state for the popOver that populates when a user clicks on a listing
  //to favorite it, but theyre not logged in
  const [popOver, setPopOver] = useState(false);

  //Here we query all listings so we can then display them on the page
  const { data } = useQuery(QUERY_POSTS);

  //Variable that holds all listings
  const AllListingsData = data?.allPost || [];

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
        <Grid spacing={6} sx={{ paddingTop: "5%", paddingBottom: "5%" }}>
          {AllListingsData.map((post) => {
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
                {Auth.loggedIn() ? (
                  <IconButton
                    onClick={() => {
                      addToFavorites(post._id);
                    }}
                    sx={{
                      marginLeft: "75%",
                      color: "grey",
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
