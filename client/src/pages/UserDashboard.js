import React, {useState} from "react";
import { useQuery } from '@apollo/client';
import {USER_QUERY} from "../utils/queries";
import { Container, Button, Card, CardMedia, Typography, CardContent, CardActions, CardHeader, Grid, } from '@mui/material';
import {ButtonComponent , EditComponent} from '../components/DashboardModal/Button';
import {FormModal, EditModal} from '../components/DashboardModal/DashboardModal'
import image from '../assets/yardsale.jpg'  // hard coding for now


const UserDashboard = () => {
    const { loading, data } = useQuery(USER_QUERY); 
    const userData = data?.me || []; 
    const [isModalOpen, setIsModalOpen] = useState(false); //modal to add a new listing is set to false
    const [editModal, setEditModal] = useState(false) // for the edit modal state
   
    //----------functions to handle the create listing modal ---------\\
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    const handleCloseModal = () => {
      setIsModalOpen(false);
      window.location.reload(); // refresh the page after a new listing is made
    };

    //----------functions to handle the edit modal ---------\\
    const handleEditModal = () => {
        setEditModal(true);
    };
    const handleEditClose = () => {
        setEditModal(false);
        window.location.reload();
    }


    if (loading) {
        return <h2>LOADING...</h2>;
      }
    return (
    <>
        <Container maxWidth="xl" >
            {/* this is the modal to create a new listing, give is a state of false, pass the prop handleCloseModal and a state to open/close the modal */}
            <FormModal handleOpen={isModalOpen} handleClose={handleCloseModal} />
            <Container maxWidth='md'>
                <Typography component='div' variant="h2" align='center' color='textPrimary' gutterBottom style={{fontSize: '3rem'}}>
                    {userData.savedPost.length
                    ? `Viewing ${userData.savedPost.length} saved ${userData.savedPost.length === 1 ? 'listing' : 'listings'}:`
                    : 'You have no saved listings!'}
                </Typography> 
                {/* modal button is the create new listing button to open modal, passing a prop that handles a function */}
                <ButtonComponent  openModal={handleOpenModal} />
            </Container>
            <Container>
                <Grid container spacing={4}>
                    {userData.savedPost.map((post) => {
                        return (
                            <Grid item xs = {12} sm = {6} md = {4}>
                                <Card component='div'sx={{ maxWidth: 345 }}>
                                    <CardHeader
                                        title={post.postName}
                                        subheader={post.createdAt}
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
                                            Address: {post.address}
                                        </Typography>
                                        
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                    {/* this is the modal to EDIT a  listing, give is a state of false, pass the prop handleCloseModal and a state to open/close the modal */}
                                    <EditModal handleEdit={editModal} handleEditClose={handleEditClose} />
                                    {/*  button is the EDIT a listing button to open modal, passing a prop that handles a function */}
                                        <EditComponent  editButton={handleEditModal} />
                                        <Button size="small" color='error'>Delete</Button>
                                    </CardActions>
                                </Card>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container> 
        </Container>
    </>
    )
};

export default UserDashboard;