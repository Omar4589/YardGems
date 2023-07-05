import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import {Box, Button} from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { ADD_POST, EDIT_POST} from '../../utils/mutations';
import { TextField, Container} from '@mui/material';
import {useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import style from './modalStyles';

//------------------Create Listing Modal--------------\\
export const FormModal = ({handleClose, handleOpen}) => {
    const [addPost, { error }] = useMutation(ADD_POST);
    const [formState, setFormState] = useState({ 
        description: '',
        address: '',
        dateOfSale: '',
        image: '',
        postName:''
      });
       
    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value});
    };

    // allows user to create a new Post
    const newPostSubmit = async (e) => {
        e.preventDefault()
        const data = new FormData(e.currentTarget);
        console.log({address: data.get("address"),postName: data.get("postName")});// just to help confirm i got some data
        const user = Auth.getProfile().data.username
        console.log(user)
        try {
          const { data } = await addPost({
            variables: {
              ...formState
              },
          });
          console.log(data);
          setFormState({
            description: '',
            address: '',
            dateOfSale: '',
            image: '',
            postName:''
          });
          handleClose(); // closing the modal 
        } catch (err) {
          console.error(err);
        }
      };
  return (
    <Container>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={handleOpen}
        onClose={handleClose}
        slots={{backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 1500,
            
          },
        }}
      >
        <Fade in={handleOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Create a new listing
            </Typography>
            <Box component="form"  onSubmit={newPostSubmit}>
                <TextField
                    helperText="Please enter a name for you item or event"
                    label="Name"
                    name= 'postName'
                    required
                    onChange={handleInputChange}
                    placeholder={formState.postName}
                    value={formState.postName}
                />
                <TextField
                    helperText="Please enter a description about your listing"
                    label="Description"
                    name='description'
                    required
                    onChange={handleInputChange}
                    placeholder={formState.description}
                    value={formState.description}
                />
                <TextField
                    helperText="Please enter a address for your listing"
                    label="Address"
                    name='address'
                    required
                    onChange={handleInputChange}
                    placeholder={formState.address}
                    value={formState.address}
                />
                <TextField
                    helperText="Please enter a date to hold your yard sale"
                    label="Date of the Sale"
                    name='dateOfSale'
                    required
                    onChange={handleInputChange}
                    placeholder={formState.dateOfSale}
                    value={formState.dateOfSale}
                />
                <TextField
                    helperText="add an image"
                    label="Image"
                    name='image'
                    onChange={handleInputChange}
                    placeholder={formState.image}
                    value={formState.image}
                />
                <br></br>
                <Button type="submit" variant="contained">Add</Button>
            </Box>
          </Box>
        </Fade>
      </Modal>
    </Container>
  );
};

// -------------EDIT modal------------------\\
export const EditModal = ({handleEdit, handleEditClose}) => {
  const [editPost, { error }] = useMutation(EDIT_POST);
  const [formState, setFormState] = useState({ 
      description: '',
      address: '',
      dateOfSale: '',
      image: '',
      postName:''
    });
   
  const handleInputChange = (event) => {
      const { name, value} = event.target;
      setFormState({ ...formState, [name]: value});
  };

  // allows user to create a new Post
  const editPostSubmit = async (e) => {
      e.preventDefault()
      const data = new FormData(e.currentTarget);
       console.log({address: data.get("address"),postName: data.get("postName")});// just to help confirm i got some data
      const user = Auth.getProfile().data.username
      console.log(user)
      try {
        const { data } = await editPost({
          variables: {
            ...formState
            },
        });
        console.log(data);
        setFormState({
          description: '',
          address: '',
          dateOfSale: '',
          image: '',
          postName:''
        });
        handleEditClose(); // closing the modal 
      } catch (err) {
        console.error(err);
      }
    };
    return (
      <div>
        <Modal
          aria-labelledby="transition-modal-title"
          aria-describedby="transition-modal-description"
          open={handleEdit}
          onClose={handleEditClose}
          slots={{backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 1500,
            },
          }}
          >
          <Fade in={handleEdit}>
            <Box sx={style}>
              <Typography id="transition-modal-title" variant="h6" component="h2">
                Edit listing
              </Typography>
              <Box component="form"  onSubmit={editPostSubmit}>
                  <TextField
                      helperText="Update the name for you item or event"
                      label="Name"
                      name ='name'
                      onChange={handleInputChange}
                      placeholder={formState.name}
                      value={formState.postName}
                      required
                  />
                  <TextField 
                      multiline
                      helperText="Update description about your listing"
                      label="Description"
                      name ='description'
                      onChange={handleInputChange}
                      placeholder={formState.description}
                      value={formState.description}
                      required
                  />
                  <TextField
                      helperText="Update the address for your listing"
                      label="Address"
                      name = 'address'
                      onChange={handleInputChange}
                      placeholder={formState.address}
                      value={formState.address}
                      required
                  />
                  <TextField
                      helperText="Update a date to hold your yard sale"
                      label="Date of the Sale"
                      name = 'dateOfSale'
                      onChange={handleInputChange}
                      placeholder={formState.dateOfSale}
                      value={formState.dateOfSale}
                      required
                  />
                  <TextField
                      helperText=" Update or add an image"
                      label="Image"
                      name = 'image'
                      onChange={handleInputChange}
                      value={formState.image}
                  />
                  <br></br>
                  <Button type='submit' variant="contained" >Update</Button>
                </Box>
            </Box>
          </Fade>
        </Modal>
      </div>
    );
};



