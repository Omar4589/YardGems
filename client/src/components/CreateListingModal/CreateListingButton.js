import React from "react";
import { Button } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";

const style = {
  button: {
    paddingBottom: "5%",
    display: "flex",
    justifyContent: "center",
  },
  text: {
    color: "#1b5e20",
    backgroundColor: "#4caf50",
    fontSize: "1em",
  },
};

//openModal comes from MyListings.js
export const CreateListingButton = ({ openModal }) => {
  return (
    <div style={style.button}>
      <Button
        style={style.text}
        onClick={openModal}
        variant="contained"
        endIcon={<AddIcon />}
      >
        Create New Listing
      </Button>
    </div>
  );
};
