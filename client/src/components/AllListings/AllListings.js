import React, {useState} from "react";
import { useQuery } from '@apollo/client';
import {QUERY_POSTS} from "../../utils/queries";
import { Container, Card, CardMedia, Typography, CardContent, CardHeader, Grid} from '@mui/material';
// import {FormModal} from '../DashboardModal/DashboardModal'
import image from '../../assets/yardsale.jpg'  // hard coding for now
// import Auth from '../utils/auth'
// import { Link } from 'react-router-dom';

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
        <Container style={{maxHeight: '100vh', overflow: 'auto'}}>
            <Grid container spacing={2}>
                {AllListingsData.map((post) => {
                    return (
                        <Grid key={post._id} item xs = {12} sm = {10} md = {6}>
                            <Card component='div'sx={{ maxWidth: 345 }}>
                                <CardHeader
                                    title={post.postName}
                                />
                                <CardMedia
                                    sx={{ height: 140, paddingTop:'56.2%' }}
                                    image={image}
                                    title="green iguana"
                                />
                                <CardContent component="div">
                                    <Typography component="span" gutterBottom variant="h5">
                                        Date Of Event: {post.dateOfSale}
                                    </Typography>
                                    <Typography component="div" variant="body2" color="text.secondary">
                                        {post.description}
                                    <Typography component="div" variant="body2" color="text.secondary">
                                        <br></br>
                                         {post.address}
                                    </Typography>
                                    
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container> 
      
    </>
    )}

export default AllListings;