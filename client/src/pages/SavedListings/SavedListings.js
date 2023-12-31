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
import image from "../../assets/yardsale.jpg"; // hard coding for now
import Auth from "../../utils/auth";
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

//----------------START OF PAGE--------------//
const SavedListings = () => {
  //destructure 'savedFavorites' and 'unfavoriteAListing' from the ListingContext
  const { savedFavorites, unfavoriteAListing } = useListingContext();

  return (
    <>
      {Auth.loggedIn() ? (
        <Container
          id="saved-listings-component"
          maxWidth=""
          sx={{
            backgroundColor: "#e8f5e9",
            paddingBottom: "10em",
            minHeight: "100vh",
          }}
        >
          <Container
            id="saved-listings-heading"
            maxWidth="md"
            sx={{ marginBottom: "0em" }}
          >
            <Typography align="center" sx={{ ...styles.heading }}>
              {savedFavorites.length
                ? `Viewing ${savedFavorites.length} saved ${
                    savedFavorites.length === 1 ? "listing" : "listings"
                  }:`
                : "You have no saved listings!"}
            </Typography>
          </Container>
          <Container id="saved-listings-container">
            <Grid container spacing={4}>
              {savedFavorites.length > 0 &&
                savedFavorites.map((post) => {
                  return (
                    <Grid key={post._id} item xs={12} sm={6} md={4}>
                      <Card
                        component="div"
                        sx={{
                          maxWidth: 500,
                          marginBottom: "1.5em",
                          minHeight: "500px",
                        }}
                      >
                        <CardHeader
                          title={post.title}
                          subheader={`Post By: ${post.author}`}
                        />
                        <Slider {...settings}>
                          {/* First we check if the array 'images' is empty, if it is, we use the default hardcoded image */}
                          {post.images.length > 0 ? (
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
