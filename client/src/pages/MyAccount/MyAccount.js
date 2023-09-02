import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { UPDATE_USERNAME } from "../../utils/mutations";
import { Box, Button, TextField, Typography, Container } from "@mui/material";
import styles from "./styles";

const MyAccount = () => {
  // State to track the form input fields for email and password
  const [userFormData, setUserFormData] = useState({ username: "", email: "" });

  const { data: loggedInUserData } = useQuery(ME_QUERY);

  const [updateUsername] = useMutation(UPDATE_USERNAME);

  useEffect(() => {
    setUserFormData({
      username: loggedInUserData.me.username,
      email: loggedInUserData.me.email,
    });
  }, [loggedInUserData]);

  // Handler to update the state when input fields change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Function to handle my account update form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      // Call the updateUsername mutation
      const { data } = await updateUsername({
        variables: { newUsername: userFormData.username },
      });

      window.location.assign("/");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Container sx={{ ...styles.mainContainer }}>
      <Box
        sx={{
          ...styles.myaccountContainer,
        }}
      >
        <Typography
          sx={{
            ...styles.heading,
          }}
        >
          My Account
        </Typography>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{}}>
          <Box sx={{ mb: 3 }}>
            <Typography component="label" sx={{ ...styles.labels }}>
              Username
            </Typography>
            <TextField
              type="text"
              required
              fullWidth
              size="small"
              margin="none"
              name="username"
              id="username"
              autoComplete="current-username"
              onChange={handleInputChange}
              value={userFormData.username}
            />
          </Box>

          <Box sx={{ ...styles.email }}>
            <Typography component="label" sx={{ ...styles.labels }}>
              Email
            </Typography>
            <TextField
              type="email"
              disabled
              fullWidth
              size="small"
              margin="none"
              name="email"
              id="email"
              autoComplete="email"
              onChange={handleInputChange}
              value={userFormData.email}
            />
          </Box>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ ...styles.button }}
          >
            Save
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default MyAccount;
