import React, {useState} from 'react';
import Backdrop from '@mui/material/Backdrop';
import {Box, Button} from '@mui/material';
import Modal from '@mui/material/Modal';
import Fade from '@mui/material/Fade';
import Typography from '@mui/material/Typography';
import { ADD_POST,  } from '../../utils/mutations';
import { TextField, Container} from '@mui/material';
import {useMutation, } from '@apollo/client';
import {style} from './modalStyles';
import usePlacesAutocomplete, { getGeocode, getLatLng } from 'use-places-autocomplete';
import { Combobox, ComboboxInput, ComboboxPopover, ComboboxList, ComboboxOption } from '@reach/combobox';
import '@reach/combobox/styles.css';




//------------------Create Listing Modal--------------\\
export const FormModal = ({handleClose, handleOpen}) => {
    const [selectedLocation, setSelectedLocation] = useState(null); 


    const [addPost, { error }] = useMutation(ADD_POST);
    const [formState, setFormState] = useState({ 
        postDescription: '',
        dateOfSale: '',
        image: '',
        postName:''
      });
      const {ready,value,suggestions: { status, data },setValue,clearSuggestions} = usePlacesAutocomplete();
     

      // for other field data
      const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormState({ ...formState, [name]: value});
    };
      // for address
      const handleNewInputChange = (e) => {
        setValue(e.target.value);
      };
      // for lat and lng
      const handleOptionSelect = async (address) => {
        setValue(address, false);
        try {
          const results = await getGeocode({ address: address });
          const { lat, lng } = await getLatLng(results[0]);
          setSelectedLocation({ address, lat, lng });
          console.log(results, lat, lng );
          clearSuggestions();
        } catch (error) {
          console.error('Error:', error);
        }
      };

      
    // allows user to create a new Post
    const newPostSubmit = async (e) => {
        e.preventDefault()
      
       
        try {
          const { data } = await addPost({
            variables: {
              ...formState, address: selectedLocation.address, lat: selectedLocation.lat, lng: selectedLocation.lng},
          });
          console.log(data);
          setFormState({
            postDescription: '',
            dateOfSale: '',
            image: '',
            postName:'',
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
            <Box component="form" onSubmit={newPostSubmit}>
              <div>
                <Combobox onSelect={handleOptionSelect}>
                  <ComboboxInput
                    value={value}
                    onChange={handleNewInputChange}
                    disabled={!ready}
                    className='comboBox-input'
                    placeholder="Add a location"
                    style={{width: '65.5%', height: '3.6em', marginBottom:'1.5em', marginTop:'1em', paddingLeft: '1em', fontSize: '1em'}}
                    required
                  />
                  <ComboboxPopover style={{ zIndex: '99999', width: '40%', fontSize: '1em', fontFamily: 'sans-serif'}}>
                    <ComboboxList>
                      {status === 'OK' &&
                        data.map(({ place_id, description }) => (
                          <ComboboxOption key={place_id} value={description} />
                        ))}
                    </ComboboxList>
                  </ComboboxPopover>
                </Combobox>
              </div>

                <TextField
                style={{width: '70%', height: '3.6em', marginBottom:'1.5em', marginTop:'1em',  fontSize: '1em'}}
                    label="Name"
                    name= 'postName'
                    required
                    onChange={handleInputChange}
                    placeholder={formState.postName}
                    value={formState.postName}
                />
                <TextField
                    style={{width: '70%', height: '3.6em', marginBottom:'1.5em', marginTop:'1em',  fontSize: '1em'}}
                    label="Description"
                    name='postDescription'
                    required
                    multiline
                    onChange={handleInputChange}
                    placeholder={formState.description}
                    value={formState.description}
                />
                <input
                    type='date'
                    style={{width: '70%', height: '3.6em', marginBottom:'1.5em', marginTop:'1em',  fontSize: '1em'}}
                    label="Date of the Sale"
                    name='dateOfSale'
                    required
                    onChange={handleInputChange}
                    placeholder={formState.dateOfSale}
                    value={formState.dateOfSale}
                />
                <TextField
                    style={{width: '70%', height: '3.6em', marginBottom:'1.5em', marginTop:'1em',  fontSize: '1em'}}
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

