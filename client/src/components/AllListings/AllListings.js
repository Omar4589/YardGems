import React, {useState} from "react";
import { useQuery } from '@apollo/client';
import {QUERY_POSTS} from "../../utils/queries";
import { Container, Card, CardMedia, Typography, CardContent, CardHeader, Grid} from '@mui/material';
import image from '../../assets/yardsale.jpg'  // hard coding for now


const AllListings = () => {
    const { data } = useQuery(QUERY_POSTS); 
    const AllListingsData = data?.allPost || []; 
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleOpenModal = () => {
        setIsModalOpen(true);
      };
      const handleCloseModal = () => {
        setIsModalOpen(false);
        window.location.reload(); // refresh the page after a new listing is made
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
                                <Typography sx={{marginLeft:'.5em'}}component="div" variant="body2" color="text.secondary">
                                        
                                </Typography>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container> 
      
    </>
    )}

export default AllListings;