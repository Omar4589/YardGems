import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./styles";

// Component for the contact us form
const ContactUs = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Event handler for input field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update the corresponding form data field
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Event handler for form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // Log form data to the console
    console.log(formData.name);
    console.log(formData.email);
    console.log(formData.message);

    try {
    } catch (err) {
      console.error(err);
    }

    // Reset form data to initial state
    setFormData({
      name: "",
      email: "",
      message: "",
    });
  };

  // Render the contact form component

  return (
    <Box sx={{ ...styles.mainContainer }}>
      <Typography sx={{ ...styles.heading }}>Contact Us</Typography>
      <Typography sx={{ ...styles.statement }}>
        We'd love to hear from you! If you have any questions, suggestions, or
        concerns, feel free to reach out to our team using the contact form
        below:
      </Typography>

      <form id="ContactUs-form" onSubmit={handleFormSubmit}>
        <Box sx={{ ...styles.fieldContainers }}>
          <Typography component="label" sx={{ ...styles.labels }}>
            Full Name
          </Typography>
          <TextField
            fullWidth
            sx={{ ...styles.inputFields }}
            type="text"
            name="name"
            required
            size="small"
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ ...styles.fieldContainers }}>
          <Typography component="label" sx={{ ...styles.labels }}>
            Email
          </Typography>
          <TextField
            type="email"
            name="email"
            fullWidth
            size="small"
            sx={{ ...styles.inputFields }}
            required
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ ...styles.fieldContainers }}>
          <Typography component="label" sx={{ ...styles.labels }}>
            Message
          </Typography>
          <TextField
            type="text"
            name="message"
            fullWidth
            multiline={true}
            rows={"6"}
            sx={{ ...styles.inputFields }}
            required
            onChange={handleInputChange}
          ></TextField>
        </Box>
        <Button
          sx={{ ...styles.button }}
          type="submit"
          fullWidth
          variant="contained"
        >
          Send
        </Button>
      </form>
    </Box>
  );
};

export default ContactUs;
