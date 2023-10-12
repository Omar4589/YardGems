//-----------------IMPORTS-----------------------//
import { useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Link,
  Container,
  Snackbar,
  Alert,
} from "@mui/material/";
import { Link as RouterLink } from "react-router-dom";
import { CREATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import appName from "../../assets/images/appName.jpg";
import styles from "./styles";

//-----------------------START OF COMPONENT-----------------------//
const SignUpForm = ({ handleComponentChange, LoginForm }) => {
  //-----------------STATE---------------//
  // State to store user input data for registration
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmpassword: "",
  });

  const [passwordMatch, setPasswordMatch] = useState(false);
  const [validEmail, setValidEmail] = useState(true);
  const [usernameLengthCheck, setUsernameLengthCheck] = useState(true);

  //Closes pop over message - 'Please log in'
  const handleCloseSnackbar = () => {
    setPasswordMatch(false);
    setValidEmail(true);
    setUsernameLengthCheck(true);
  };

  //-----------------MUTATIONS------------//
  // Use the CREATE_USER mutation for user registration
  const [createUser, { error, data }] = useMutation(CREATE_USER);

  //----------SIGNUP FORM HANDLERS ---------\\
  // Handler for input field changes in the signup form
  const handleInputChange = (event) => {
    const { name, value } = event.target;

    let newValue = value;

    if (name === "email") {
      newValue = value.toLowerCase();
    }

    setUserFormData({
      ...userFormData,
      [name]: newValue,
    });
  };

  const isValidEmail = (email) => {
    const re = /^([a-z0-9_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/;
    return re.test(String(email));
  };

  // This function handles the sign up form submission
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (userFormData.username.length > 23) {
        setUsernameLengthCheck(false);
        return;
      }

      if (userFormData.confirmpassword !== userFormData.password) {
        setPasswordMatch(true);
        return;
      }

      if (!isValidEmail(userFormData.email)) {
        setValidEmail(false);
        return;
      }

      // Use the createUser mutation to register the user
      const { data } = await createUser({
        variables: {
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      // Log the user in with the generated token
      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
    }

    // Clear the form data after submission
    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Container sx={{ ...styles.mainContainer }}>
      <Box
        sx={{
          ...styles.signupContainer,
        }}
      >
        <Box
          sx={{
            ...styles.appName,
          }}
        >
          <Link
            component={RouterLink}
            to="/"
            sx={{ ...styles.logoLink }}
            color={"inherit"}
          >
            <img src={appName} width="100%" height="100%" alt="green_gem" />
          </Link>{" "}
        </Box>

        <Typography
          sx={{
            ...styles.heading,
          }}
        >
          Sign Up
        </Typography>

        <form id="signup-form" onSubmit={handleFormSubmit}>
          <Box sx={{ ...styles.inputBoxes }}>
            <Typography component="label" sx={{ ...styles.labels }}>
              Username
            </Typography>
            <TextField
              type="text"
              id="name-signup"
              name="username"
              fullWidth
              variant="outlined"
              size="small"
              margin="none"
              required
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ ...styles.inputBoxes }}>
            <Typography component="label" sx={{ ...styles.labels }}>
              Email
            </Typography>
            <TextField
              type="email"
              id="email-signup"
              name="email"
              fullWidth
              variant="outlined"
              size="small"
              margin="none"
              required
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ ...styles.inputBoxes }}>
            <Typography component="label" sx={{ ...styles.labels }}>
              Password
            </Typography>
            <TextField
              type="password"
              id="password-signup"
              name="password"
              fullWidth
              variant="outlined"
              size="small"
              margin="none"
              required
              onChange={handleInputChange}
            />
          </Box>
          <Box sx={{ mb: 3 }}>
            <Typography
              component="label"
              sx={{ ...styles.labels }}
              htmlFor="confirmpassword-signup"
            >
              Confirm Password
            </Typography>
            <TextField
              type="password"
              id="confirmpassword-signup"
              name="confirmpassword"
              fullWidth
              variant="outlined"
              size="small"
              margin="none"
              required
              onChange={handleInputChange}
            />
          </Box>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{
              ...styles.button,
            }}
          >
            Sign Up
          </Button>
        </form>
        <Box sx={{ ...styles.login }}>
          <Typography>
            Already have an account?
            <Button
              onClick={() => handleComponentChange(LoginForm)}
              style={{ ...styles.loginButton }}
            >
              Login
            </Button>
          </Typography>
        </Box>
      </Box>
      <Snackbar
        open={
          passwordMatch || validEmail === false || usernameLengthCheck === false
        }
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert onClose={handleCloseSnackbar} severity="error" sx={{...styles.snackAlert}}>
          {passwordMatch
            ? "Passwords don't match. Please try again."
            : !validEmail
            ? "Please enter a valid email."
            : !usernameLengthCheck
            ? "The username you entered is too long, please try again."
            : ""}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default SignUpForm;
