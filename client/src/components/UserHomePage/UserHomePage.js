import React, {useState} from "react";
import { useQuery, useMutation } from '@apollo/client';
import {QUERY_POSTS} from "../../utils/queries";
import {ADD_FAVORITES, REMOVE_FAVORITES} from '../../utils/mutations'
import { Container, Card, CardMedia, Typography, CardContent, CardHeader, Grid, IconButton} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import image from '../../assets/yardsale.jpg'  // hard coding for now
import Auth from '../../utils/auth'


const UserHome = () => {
    const [favorite, setFavorite] = useState(false); //the default value is no favorite item initially
    const { data } = useQuery(QUERY_POSTS); 
    const AllListingsData = data?.allPost || []; 
    const [addFavorites, { error }] = useMutation(ADD_FAVORITES);
    const [removeFavorites, { err }] = useMutation(REMOVE_FAVORITES);
    
    const removeFromFavorites = async (_id) => {
        console.log(_id)
       
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
            return false;
        }
        try {
            const { data } = await removeFavorites({variables: {postId: _id}});
        } 
        catch (err) {
            console.error(err);
        }
       // window.location.reload();
    };


    const addToFavorites = async (_id) => {
        console.log(_id)
       
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
            return false;
        }
        try {

            const { data } = await addFavorites({variables: {postId: _id}});
        } 
        catch (err) {
            console.error(err);
        }
       // window.location.reload();
    };
    
    return (
    <>
        <Container style={{maxHeight: '100vh', overflow: 'auto', backgroundColor: '#e8f5e9'}}>
            <Grid container spacing={2}>
                {AllListingsData.map((post) => {
                    return (
                        <Grid key={post._id} item xs = {12} sm = {10} md = {6}>
                            <Card component='div'sx={{ maxWidth: 345, marginTop:'.5em', marginBottom:'.5em' }}>
                                <CardHeader
                                    title={post.postName}
                                    subheader={`Post By: ${post.postAuthor}`}
                                />
                                <CardMedia
                                    sx={{ height: 140, paddingTop:'56.2%' }}
                                    image={image}
                                    
                                />
                                <CardContent component="div">
                                    <Typography component="span" gutterBottom variant="h5">
                                        Event Date: {post.dateOfSale}
                                    </Typography>
                                    <Typography component="div" variant="body2" color="text.secondary">
                                        {post.postDescription}
                                    <Typography component="div" variant="body2" color="text.secondary">
                                        <br></br>
                                         {post.address}
                                    </Typography>
                                    </Typography>
                                </CardContent>
                                <IconButton onClick={() => {setFavorite(!favorite); addToFavorites(post._id)} }sx={{marginLeft:'80%'}} aria-label="favorite">
                                {favorite ? <FavoriteIcon sx={{color:'red'}} /> : <FavoriteIcon  sx={{color:'grey'}} />}
                                </IconButton>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container> 
      
    </>
    )}

export default UserHome;