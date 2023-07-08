import { useState } from "react";
import { Typography, Box, TextField, Button, Link } from "@mui/material/";
import { Link as RouterLink } from "react-router-dom";
import { CREATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import appName from "../../assets/images/appName.jpg";
import styles from "./styles";

const SignUpForm = ({ handleComponentChange, LoginForm }) => {
  // set initial form state
  const [userFormData, setUserFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [createUser, { error, data }] = useMutation(CREATE_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;

    setUserFormData({
      ...userFormData,
      [name]: value,
    });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    console.log(userFormData.username);
    console.log(userFormData.email);
    console.log(userFormData.password);

    try {
      const { data } = await createUser({
        variables: {
          username: userFormData.username,
          email: userFormData.email,
          password: userFormData.password,
        },
      });

      Auth.login(data.createUser.token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      username: "",
      email: "",
      password: "",
    });
  };

  return (
    <Box sx={{ ...styles.mainContainer }}>
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
              name="password_confirmation"
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
    </Box>
  );
};

export default SignUpForm;
