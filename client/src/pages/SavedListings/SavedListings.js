import React, { useState, useEffect } from "react";
import { useQuery, useMutation } from "@apollo/client";
import { USER_QUERY } from "../../utils/queries";
import { REMOVE_FAVORITES } from "../../utils/mutations";
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
import image from "../../assets/yardsale.jpg"; // hard coding for now
import Auth from "../../utils/auth";
import AdditionalFeatures from "../AdditionalFeatures/AdditionalFeatures";

const SavedListings = () => {
  const { loading, data } = useQuery(USER_QUERY);
  const userData = data?.me || [];
  const [removeFavorites, { err }] = useMutation(REMOVE_FAVORITES);

  //----------functions to handle the DELETE listing ---------\\

  const removeFromFavorites = async (_id) => {
    console.log(_id);

    const token = Auth.loggedIn() ? Auth.getToken() : null;

    if (!token) {
      return false;
    }
    try {
      const { data } = await removeFavorites({ variables: { postId: _id } });
    } catch (err) {
      console.error(err);
    }
    window.location.reload();
  };
  if (loading) {
    return <h2>LOADING...</h2>;
  }
  return (
    <>
      {Auth.loggedIn() ? (
        <Container
          maxWidth="xl"
          sx={{ backgroundColor: "#e8f5e9", paddingBottom: "1em" }}
        >
          <Container maxWidth="md">
            <Typography
              component="div"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ fontSize: "3rem" }}
            >
              {userData.savedFavorites.length
                ? `Viewing ${userData.savedFavorites.length} saved ${
                    userData.savedFavorites.length === 1
                      ? "listing"
                      : "listings"
                  }:`
                : "You have no saved listings!"}
            </Typography>
          </Container>
          <Container>
            <Grid container spacing={4}>
              {userData.savedFavorites.map((post) => {
                return (
                  <Grid key={post._id} item xs={12} sm={6} md={4}>
                    <Card
                      component="div"
                      sx={{ maxWidth: 500, marginBottom: "1.5em" }}
                    >
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
                          {post.postDescription}
                          <Typography
                            component="div"
                            variant="body2"
                            color="text.secondary"
                          >
                            Address: {post.address}
                          </Typography>
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button
                          onClick={() => removeFromFavorites(post._id)}
                          size="small"
                          color="error"
                          variant="outlined"
                        >
                          Remove favorite
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

export default SavedListings;
