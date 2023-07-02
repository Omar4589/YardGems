import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import {Box, Button} from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { ADD_POST } from '../../utils/mutations';
import {FormControl, TextField} from '@mui/material';
import {useMutation } from '@apollo/client';
import Auth from '../../utils/auth';
import style from './modalStyles';


const FormModal = ({handleClose, handleOpen}) => {
    const [addPost, { error }] = useMutation(ADD_POST);
    const [formState, setFormState] = useState({ // setting state for the form 
        description: '',
        address: '',
        dateOfSale: '',
        image: '',
      });

    const [description, setDescription] = useState('');
    const [address, setAddress] = useState('');
    const [dateOfSale, setDateOfSale] = useState('');
    const [image, setImage] = useState('');

    // why doesnt this work
    const handleInputChange = (event) => {
        const { label, placeholder } = event.target.value;
        setFormState({ ...formState, [label]: placeholder });
    };

    const handleDescription = (e) => {
        setDescription(e.target.value);
    }
    const handleAddress = (e) => {
        setAddress(e.target.value);
    }
    const handleDateOfSale = (e) => {
        setDateOfSale(e.target.value);
    }
    const handleIamge = (e) => {
        setImage(e.target.value);
    }
    // allows user to create a new Post
    const newPostSubmit = async (e) => {
        e.preventDefault()
        const user = Auth.getProfile().data.username
        console.log(user);
        console.log(description);
        console.log(address);
        console.log(dateOfSale);
        console.log(image)
        try {
          const { data } = await addPost({
            variables: {
                description: description,
                address: address,
                dateOfSale: dateOfSale,
                image: image
              },
          });
          console.log(data);
          setFormState('');
          handleClose();
        } catch (err) {
          console.error(err);
        }
      };


  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        open={handleOpen}
        onClose={handleClose}
        slots={{ backdrop: Backdrop }}
        slotProps={{
          backdrop: {
            timeout: 1500,
          },
        }}
      >
        <Fade in={handleOpen}>
          <Box sx={style}>
            <Typography id="transition-modal-title" variant="h6" component="h2">
              Creat a new listing
            </Typography>
            <FormControl>
                <TextField
                    helperText="Please enter a description about your listing"
                    id="demo-helper-text-aligned"
                    label="Description"
                    onChange={handleDescription}
                    placeholder={formState.description}
                    />
                    <TextField
                    helperText="Please enter a address for your listing"
                    id="demo-helper-text-aligned"
                    label="Address"
                    onChange={handleAddress}
                    placeholder={formState.address}
                    />
                    <TextField
                    helperText="Please enter a date to hold your yard sale"
                    id="demo-helper-text-aligned"
                    label="Date of the Sale"
                    onChange={handleDateOfSale}
                    placeholder={formState.dateOfSale}
                    />
                    <TextField
                    helperText="add an image"
                    id="demo-helper-text-aligned"
                    label="Image"
                    onChange={handleIamge}
                    placeholder={formState.image}
                    />
                    <Button variant="contained" onClick={newPostSubmit}>Add</Button>
            </FormControl>
          </Box>
        </Fade>
      </Modal>
    </div>
  );
}
export default FormModal;