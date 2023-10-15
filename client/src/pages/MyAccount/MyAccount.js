import React, { useState, useEffect } from "react";
import { useQuery } from "@apollo/client";
import { ME_QUERY } from "../../utils/queries";
import { useMutation } from "@apollo/client";
import { UPDATE_USERNAME, UPDATE_PASSWORD } from "../../utils/mutations";
import {
  Box,
  Snackbar,
  Alert,
  Button,
  TextField,
  Typography,
  Container,
} from "@mui/material";
import styles from "./styles";

const MyAccount = () => {
  // State to track the form input fields
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    currentPassword: "",
    newPassword: "",
    confirmNewPassword: "",
  });

  //used to verify new passwords match
  const [passwordMatch, setPasswordMatch] = useState(false);
  //used to check username length
  const [usernameLengthCheck, setUsernameLengthCheck] = useState(true);
  //used to check password length
  const [passwordLengthCheck, setPasswordLengthCheck] = useState(true);
  //used to notify user if they havent made a change and try to submit the form
  const [makeChangeMessage, setMakeChangeMessage] = useState(false);

  //--------------QUERIES----------//
  //queries data of logged in user
  const { data: loggedInUserData } = useQuery(ME_QUERY);
  //----------------MUTATIONS--------------//
  //updates username
  const [updateUsername] = useMutation(UPDATE_USERNAME);
  //updates password
  const [updatePassword] = useMutation(UPDATE_PASSWORD);
  //------------HOOKS-----------//
  useEffect(() => {
    setUserFormData({
      username: loggedInUserData.me.username,
      email: loggedInUserData.me.email,
      currentPassword: "",
      newPassword: "",
      confirmNewPassword: "",
    });
  }, [loggedInUserData]);
  //-------------------HANDLERS---------------//
  // Handler to update the state when input fields change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleCloseSnackbar = () => {
    setPasswordMatch(false);
    setPasswordLengthCheck(true);
    setUsernameLengthCheck(true);
    setMakeChangeMessage(false);
  };

  // Function to handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();

    try {
      if (
        userFormData.username === loggedInUserData.me.username &&
        userFormData.currentPassword === ""
      ) {
        setMakeChangeMessage(true);
        return;
      }

      if (userFormData.username.length < 1) {
        setUserFormData({
          ...userFormData,
          username: loggedInUserData.me.username,
        });
        return;
      } else if (userFormData.username.length > 23) {
        setUsernameLengthCheck(false);
        return;
      }

      // Call the updateUsername mutation
      const { userUpdateData } = await updateUsername({
        variables: { newUsername: userFormData.username },
      });

      if (
        userFormData.currentPassword < 1 &&
        userFormData.newPassword < 1 &&
        userFormData.confirmNewPassword < 1
      ) {
        return;
      }

      if (userFormData.newPassword < 8) {
        setPasswordLengthCheck(false);
        return;
      }

      if (userFormData.confirmNewPassword !== userFormData.newPassword) {
        setPasswordMatch(true);
        return;
      }

      const { passwordUpdateData } = await updatePassword({
        variables: {
          email: userFormData.email,
          currentPassword: userFormData.currentPassword,
          newPassword: userFormData.newPassword,
        },
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

          <Box sx={{ ...styles.email }}>
            <Typography component="label" sx={{ ...styles.labels }}>
              Current Password
            </Typography>
            <TextField
              type="password"
              fullWidth
              size="small"
              margin="none"
              name="currentPassword"
              id="currentPassword"
              autoComplete="password"
              onChange={handleInputChange}
              value={userFormData.password}
            />
          </Box>

          <Box sx={{ ...styles.email }}>
            <Typography component="label" sx={{ ...styles.labels }}>
              New Password
            </Typography>
            <TextField
              type="password"
              fullWidth
              size="small"
              margin="none"
              name="newPassword"
              id="newPassword"
              autoComplete="password"
              onChange={handleInputChange}
              value={userFormData.newPassword}
            />
          </Box>

          <Box sx={{ ...styles.email }}>
            <Typography component="label" sx={{ ...styles.labels }}>
              Confirm New Password
            </Typography>
            <TextField
              type="password"
              fullWidth
              size="small"
              margin="none"
              name="confirmNewPassword"
              id="confirmNewPassword"
              autoComplete="password"
              onChange={handleInputChange}
              value={userFormData.confirmNewPassword}
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
      <Snackbar
        open={
          passwordMatch ||
          passwordLengthCheck === false ||
          usernameLengthCheck === false ||
          makeChangeMessage
        }
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="error"
          sx={{ ...styles.snackAlert }}
        >
          {passwordMatch
            ? "Passwords don't match. Please try again."
            : !passwordLengthCheck
            ? "Password must be at least 8 characters long."
            : !usernameLengthCheck
            ? "The username you entered is too long, please try again."
            : makeChangeMessage
            ? "Please make a change to your username or password to continue."
            : ""}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default MyAccount;
