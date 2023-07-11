import React, {useState} from "react";
import { useQuery, useMutation } from '@apollo/client';
import {USER_QUERY} from "../../utils/queries";
import {REMOVE_POST} from '../../utils/mutations'
import { Container, Card, CardMedia, Typography, CardContent, CardActions, CardHeader, Grid,Button } from '@mui/material';
import {ButtonComponent } from '../../components/DashboardModal/Button';
import {FormModal} from '../../components/DashboardModal/DashboardModal'
import image from '../../assets/yardsale.jpg'  // hard coding for now
import Auth from '../../utils/auth'
import { Link } from 'react-router-dom';

const UserDashboard = () => {
    const { loading, data } = useQuery(USER_QUERY); 
    const userData = data?.me || []; 
    const [isModalOpen, setIsModalOpen] = useState(false); 
    const [removePost, { error }] = useMutation(REMOVE_POST);

//----------functions to handle the CREATE listing modal ---------\\
    const handleOpenModal = () => {
      setIsModalOpen(true);
    };
    const handleCloseModal = () => {
      setIsModalOpen(false);
      window.location.reload(); // refresh the page after a new listing is made
    };

//----------functions to handle the DELETE listing ---------\\
   
    const deletePostSubmit = async (_id) => {
        const token = Auth.loggedIn() ? Auth.getToken() : null;
    
        if (!token) {
        return false;
        }
        try {
        const { data } = await removePost({variables: {postId: _id}});
        } 
        catch (err) {
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
        <Container maxWidth="xl" sx={{backgroundColor: '#e8f5e9'}}>
        <Container maxWidth='md'>
            <Typography component='div' variant="h2" align='center' color='textPrimary' gutterBottom style={{fontSize: '3rem'}}>
                {userData.savedPost.length
                ? `You have ${userData.savedPost.length} garage sale ${userData.savedPost.length === 1 ? 'listing' : 'listings'}:`
                : 'You have no saved listings!'}
            </Typography> 
            {/* button is the create new listing button to open modal, passing a prop that handles a function */}
            <ButtonComponent  openModal={handleOpenModal} />
        {/* this is the modal to create a new listing, give is a state of false, pass the prop handleCloseModal and a state to open/close the modal */}
        <FormModal handleOpen={isModalOpen} handleClose={handleCloseModal} />
        </Container>
        <Container>
            <Grid container spacing={4}>
                {userData.savedPost.map((post) => {
                    return (
                        <Grid key={post._id} item xs = {12} sm = {6} md = {4}>
                            <Card component='div'sx={{ maxWidth: 500, marginBottom:'1em' }}>
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
                                        {post.postDescription}
                                    <Typography component="div" variant="body2" color="text.secondary">
                                        {post.address}
                                    </Typography>
                                    
                                    </Typography>
                                </CardContent>
                                <CardActions>
                                    <Link to={`/listings/${post._id}`}>
                                        <Button size="small" color='primary' variant="outlined" style={{marginRight:'1em'}}>Edit</Button>
                                    </Link>
                                    <Button onClick={() => deletePostSubmit(post._id)} size="small" color='error' variant="outlined">
                                        Delete
                                    </Button>
                                </CardActions>
                            </Card>
                        </Grid>
                    )
                })}
            </Grid>
        </Container> 
    </Container>
    ) :(
        <div>Opps... You need to be logged in</div>
    )}
      
    </>
)
};

export default UserDashboard;