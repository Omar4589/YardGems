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
import { useListingContext } from "../../utils/ListingContext";

//----------------START OF PAGE--------------//
const SavedListings = () => {
  //destructure 'savedFavorites' and 'unfavoriteAListing' from the ListingContext
  const { savedFavorites, unfavoriteAListing } = useListingContext();

  return (
    <>
      {Auth.loggedIn() ? (
        <Container
          maxWidth="xl"
          sx={{
            backgroundColor: "#e8f5e9",
            marginBottom: "4em",
            height: "100vh",
          }}
        >
          <Container maxWidth="md" sx={{ marginBottom: "2em" }}>
            <Typography
              component="div"
              variant="h2"
              align="center"
              color="textPrimary"
              gutterBottom
              style={{ fontSize: "3rem", paddingTop: "3%" }}
            >
              {savedFavorites.length
                ? `Viewing ${savedFavorites.length} saved ${
                    savedFavorites.length === 1 ? "listing" : "listings"
                  }:`
                : "You have no saved listings!"}
            </Typography>
          </Container>
          <Container>
            <Grid container spacing={4}>
              {savedFavorites.length > 0 &&
                savedFavorites.map((post) => {
                  return (
                    <Grid key={post._id} item xs={12} sm={6} md={4}>
                      <Card
                        component="div"
                        sx={{ maxWidth: 500, marginBottom: "1.5em" }}
                      >
                        <CardHeader
                          title={post.title}
                          subheader={`Post By: ${post.author}`}
                        />
                        <CardMedia
                          sx={{ height: 140, paddingTop: "56.2%" }}
                          image={image}
                        />
                        <CardContent component="div">
                          <Typography
                            component="span"
                            gutterBottom
                            variant="h5"
                          >
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
                              Address: {post.address}
                            </Typography>
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button
                            onClick={() => unfavoriteAListing(post._id)}
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

// const [removeFavorites, { err }] = useMutation(REMOVE_FAVORITES);

// //----------functions to handle the DELETE listing ---------\\
// const removeFromFavorites = async (_id) => {
//   console.log(_id);
//   const token = Auth.loggedIn() ? Auth.getToken() : null;
//   if (!token) {
//     return false;
//   }
//   try {
//     const { data } = await removeFavorites({ variables: { listingId: _id } });

//     // Update the state to remove the favorite listing
//     setSavedListings((prevListings) =>
//       prevListings.filter((listing) => listing._id !== _id)
//     );
//   } catch (err) {
//     console.error(err);
//   }
// };
