import React, { useState, useEffect } from "react";
import Auth from "../../utils/auth";
import { ADD_FAVORITES } from "../../utils/mutations";

//---------Start of component-----//
const AllListings = () => {
  //---------STATES--------//

  //State for user favorites
  const [userFavorites, setUserFavorites] = useState([]);

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

  return (
    <>
      <Container>
        <Grid>
          {allListings.map((post) => {
            return (
              <Card>
                <CardActionArea onClick={() => openModal(post)}>
                  <CardHeader
                    title={post.postName}
                    subheader={`Listed by: ${post.postAuthor}`}
                  />
                  <CardMedia image={image} />
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
                  >
                    <FavoriteIcon />
                  </IconButton>
                ) : (
                  <IconButton onClick={() => setPopOver(true)}>
                    <FavoriteIcon />
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
      </Container>
    </>
  );
};

export default AllListings;
