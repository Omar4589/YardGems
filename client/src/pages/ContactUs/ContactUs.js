//-----------------IMPORTS-----------------------//
import {
  Box,
  Button,
  TextField,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import React, { useState } from "react";
import styles from "./styles";
import emailjs, { send } from "@emailjs/browser"; //For more info visit : https://www.emailjs.com/docs/

//-----------------------START OF COMPONENT-----------------------//
const ContactUs = () => {
  //-----------------STATE---------------//
  // State to store form data
  const [formData, setFormData] = useState({
    user_name: "",
    user_email: "",
    message: "",
  });
//renders snackbar after sendEmail() is called
  const [emailWasSent, setEmailWasSent] = useState(false);

 
  //--------------HANDLERES-----------//
  // Event handler for input field changes, updates state as field changes
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    // Update the corresponding form data field
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  
  //This function is responsible for submitting the contact us form and invoking the sendEmail function
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      await sendEmail();
      setEmailWasSent(true);
      setTimeout(() => {
        window.location.replace("/");
      }, 3200);
    } catch (err) {
      console.error(err);
    }
  };

   //Closes pop over message - 'Please log in'
   const handleCloseSnackbar = () => {
    setEmailWasSent(false);
  };


  //When using EMAILJS, we must first initiate the service using init() which takes a PUBLIC_KEY as a parameter
  //The public key is provided by EMAILJS when you sign up .
  // https://dashboard.emailjs.com/admin/account
  emailjs.init(process.env.REACT_APP_EMAILJS_KEY);

  //This function uses emailjs's sendForm method to send the actual email
  const sendEmail = (event) => {
    try {
      //Get a handle on the HTML form element
      const form = document.getElementById("contactus-form");

      //sendForm() takes in 3 parameters,
      //1: the service ID of your email service; this is provided when you 'create a service' in the EMAILJS dashboard;
      //I.E. if youre using a gmail email, you 'create a service' for GMAIL and enter your gmail details. EMAILJS will the provide you with an ID
      //2. the Template ID of the email template you want to use. You can create email templates, visit https://www.emailjs.com/docs/tutorial/creating-email-template/
      //3. The HTML form element; above we get a handle on it using getElementById method
      emailjs.sendForm(process.env.REACT_APP_EMAILJS_SERVICE, "contactus_form", form);

      // Clear input fields visually
      document.getElementById("user_name").value = "";
      document.getElementById("user_email").value = "";
      document.getElementById("message").value = "";
    } catch (err) {
      console.log(err);
    }
  };

  //----------------------RETURN STATEMENT------------------------//
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
          id="send-button"
          sx={{ ...styles.button }}
          type="submit"
          fullWidth
          variant="contained"
        >
          Send
        </Button>
      </form>
      <Snackbar
        open={emailWasSent}
        autoHideDuration={2500}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          sx={{ ...styles.snackAlert }}
          onClose={handleCloseSnackbar}
          severity="error"
        >
          Message sent! We will respond ASAP.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default ContactUs;
