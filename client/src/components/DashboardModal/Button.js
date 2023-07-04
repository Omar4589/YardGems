import React from 'react';
import {  Button } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const style = {
  button: {
    paddingBottom: '5%',
    display:'flex',
    justifyContent:'center',
    
  },
  text: {
    color:'#1b5e20',
    backgroundColor: '#4caf50',
    fontSize:'1em'
  }
}
// openModal is is function handleOpenModal and pass it to the button for a onClick event
export const ButtonComponent = ({ openModal }) => {
  return (
    <div style={style.button}>
      <Button style={style.text} onClick={openModal} variant="contained" endIcon={<AddIcon />}>
        Create New Listing
      </Button>
    </div>
  );
};
// edit button for modal pop up
 export const EditComponent = ({ editButton }) => {
  return (
    <div >
      <Button  onClick={editButton} size="small" color='primary' variant="outlined" style={{marginRight:'1em'}}>
        Edit
      </Button>
    </div>
  );
};




