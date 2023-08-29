//-----------------IMPORTS-----------------------//
import React, { useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
  Button,
  TextField,
  Link,
  Box,
  Typography,
  Container,
} from "@mui/material/";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import styles from "./styles";
import appName from "../../assets/images/appName.jpg";
import greenGem from "../../assets/images/greenGem.png";

//-----------------------START OF COMPONENT-----------------------//
export default function SignIn() {
  //-----------------STATE---------------//
  // State to track the form input fields for email and password
  const [userFormData, setUserFormData] = useState({ email: "", password: "" });

  //-----------------MUTATIONS------------//
  // Define the 'login' mutation using the LOGIN_USER mutation imported above
  const [login, { error }] = useMutation(LOGIN_USER);

  //----------LOGIN FORM HANDLERS ---------\\
  // Handler to update the state when input fields change
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  // Function to handle login form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({ email: data.get("email"), password: data.get("password") });

    try {
      // Use the 'login' mutation to log the user in
      const { data } = await login({
        variables: { ...userFormData },
      });

      // Log the user in with the generated token
      Auth.login(data.login.token);
    } catch (err) {
      console.error(err);
    }

    // Clear the form data after submission
    setUserFormData({
      email: "",
      password: "",
    });
  };

  return (
    <Container sx={{ ...styles.mainContainer }}>
      <Box
        sx={{
          ...styles.loginContainer,
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
          Sign In
        </Typography>

        <Box component="form" onSubmit={handleSubmit} noValidate sx={{}}>
          <Box sx={{ ...styles.email }}>
            <Typography component="label" sx={{ ...styles.labels }}>
              Email
            </Typography>
            <TextField
              type="email"
              required
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

          <Box sx={{ mb: 3 }}>
            <Typography component="label" sx={{ ...styles.labels }}>
              Password
            </Typography>
            <TextField
              type="password"
              required
              fullWidth
              size="small"
              margin="none"
              name="password"
              id="password"
              autoComplete="current-password"
              onChange={handleInputChange}
              value={userFormData.password}
            />
          </Box>
          {/* <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          /> */}
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ ...styles.button }}
          >
            Sign In
          </Button>

          {/* <Link href="#" variant="body2">
            Forgot password?
          </Link> */}
        </Box>
        <Box sx={{}}>
          <Typography
            sx={{
              ...styles.happyHunting,
            }}
          >
            Happy Hunting...
            <img src={greenGem} width="40px" height="40px" alt="greenGem" />
          </Typography>
        </Box>
      </Box>
    </Container>
  );
}
