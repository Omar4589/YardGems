import React, {useState}from "react";
import { useParams } from 'react-router-dom';
import { useQuery, useMutation } from '@apollo/client';
import { QUERY_SINGLE_POST } from '../utils/queries';
import {  EDIT_POST} from '../utils/mutations';
import { Container, Box,  Grid, TextField, Button, Typography} from "@mui/material/";


const SinglePost = () => {
    // Use `useParams()` to retrieve value of the route parameter `:listingId`
    const { listingId } = useParams();
    const [editPost, { error }] = useMutation(EDIT_POST);
    const { loading, data } = useQuery(QUERY_SINGLE_POST, {
      variables: { listingId: listingId }, // Pass the `listingId` URL parameter into query to retrieve this post only data
    });
    const post = data?.post || {};
     //console.log(post._id)
    const [formState, setFormState] = useState({ 
        description: post.description,
        address: post.address,
        dateOfSale: post.dateOfSale,
        image: '',
        postName: post.postName
      });
  
     
    const handleInputChange = (event) => {
        const { name, value} = event.target;
        setFormState({ ...formState, [name]: value});
    };

    const editPostSubmit = async (e) => {
        e.preventDefault();
        // console.log(formState.address)
        // console.log(formState.postName)
        // console.log(formState.description)
        // console.log(formState.dateOfSale)
        
        try {
          const { data } = await editPost({
            variables: {
              ...formState, id: post._id},
          });
         //console.log(data);
          setFormState({
            description: '',
            address: '',
            dateOfSale: '',
            image: '',
            postName:''
          });
          window.location.replace('/userdashboard')
        } catch (err) {
          console.error(err);
        }
      };

    if (loading) {
      return <div>Loading...</div>;
    }
    return (
        <Container maxWidth="xl">
            <Typography>
                Edit Current Listing...
            </Typography>
            <Box component='form' sx={{width:'70%', padding:'3em'}} onSubmit={editPostSubmit}>
                <Grid container spacing={12}>
                    <Grid item xs={12} >
                        <TextField fullWidth label='Date Of Sale' id="fullWidth" 
                        helperText={post.dateOfSale}
                        onChange={handleInputChange}
                        value={formState.dateOfSale}
                        name ='dateOfSale'
                    
                        
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Name" id="fullWidth" 
                        helperText={post.postName}
                        onChange={handleInputChange}
                        value={formState.postName}
                        name ='postName'
                     
                        />
                        </Grid>
                    <Grid item xs={12}>
                        <TextField multiline fullWidth label="Description" id="fullWidth" 
                        helperText={post.description}
                        onChange={handleInputChange}
                        value={formState.description}
                        name ='description'
                       
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField fullWidth label="Address" id="fullWidth" 
                        helperText={post.address}
                        onChange={handleInputChange}
                        value={formState.address}
                        name ='address'
                        
                        />
                    </Grid>
                    <Grid item xs={12}>
                        {/* <TextField fullWidth label="fullWidth" id="fullWidth" 
                        
                        /> */}
                    </Grid>
                </Grid>
                <Button type='submit' >
                    Submit Edit
                </Button>
            </Box>
        </Container>
    );
  };
  
  export default SinglePost;
  