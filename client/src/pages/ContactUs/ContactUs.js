import { Box, Button, TextField, Typography } from "@mui/material";
import React, { useState } from "react";
import styles from "./styles";
import emailjs from "@emailjs/browser";

// Component for the contact us form
const ContactUs = () => {
  // State to store form data
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
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
    console.log(formData.user_name);
    console.log(formData.user_email);
    console.log(formData.message);

    try {
      await sendEmail();
    } catch (err) {
      console.error(err);
    }
  };
  emailjs.init("yHQDycNvnINCMJg1d");

  const sendEmail = (event) => {
    try {
      const form = document.getElementById("contactus-form");
      // these IDs from the previous steps
      emailjs.sendForm("service_y0kbg4u", "contactus_form", form);
      // Clear input fields
      // Clear input fields visually
      document.getElementById("user_name").value = "";
      document.getElementById("user_email").value = "";
      document.getElementById("message").value = "";
      console.log(
        "Email Sent Successfully and input fields have been cleared!"
      );
    } catch (err) {
      console.log(err);
    }
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

      <form id="contactus-form" onSubmit={handleFormSubmit}>
        <Box sx={{ ...styles.fieldContainers }}>
          <Typography component="label" sx={{ ...styles.labels }}>
            Full Name
          </Typography>
          <TextField
            fullWidth
            sx={{ ...styles.inputFields }}
            type="text"
            id="user_name"
            name="user_name"
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
            id="user_email"
            name="user_email"
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
            id="message"
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
