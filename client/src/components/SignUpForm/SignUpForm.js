import { useState } from "react";
import { Typography, Box, TextField, Button } from "@mui/material/";
import { Link } from "react-router-dom";
import { CREATE_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import { useMutation } from "@apollo/client";
import greenGem from "../../assets/greenGem.png";

const SignUpForm = ({handleComponentChange, LoginForm}) => {
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
    console.log(userFormData);

    try {
      const { data } = await createUser({ variables: userFormData });

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
    <Box
      sx={{
        background: "white",
        mx: 2,
        px: 5,
        marginTop: "25%",
        marginBottom: "25%",
      }}
    >
      <Typography
        variant="h4"
        component="h1"
        sx={{
          display: "flex",
          justifyContent: "center",
          fontWeight: "bold",
          mb: 2,
          textAlign: "center",
        }}
      >
        YardGems{" "}
        <img src={greenGem} width="40px" height="40px" alt="green_gem" />
      </Typography>

      <Typography
        variant="h6"
        component="h2"
        sx={{
          fontWeight: "bold",
          mb: 1,
        }}
      >
        Sign Up
      </Typography>
      <form id="signup-form" onSubmit={handleFormSubmit}>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            component="label"
            sx={{ fontWeight: "semibold", mb: 1, display: "block" }}
          >
            Username
          </Typography>
          <TextField
            type="text"
            id="name-signup"
            name="name"
            fullWidth
            variant="outlined"
            required
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            component="label"
            sx={{ fontWeight: "semibold", mb: 1, display: "block" }}
          >
            Email
          </Typography>
          <TextField
            type="email"
            id="email-signup"
            name="email"
            fullWidth
            variant="outlined"
            required
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ mb: 2 }}>
          <Typography
            variant="subtitle1"
            component="label"
            sx={{ fontWeight: "semibold", mb: 1, display: "block" }}
          >
            Password
          </Typography>
          <TextField
            type="password"
            id="password-signup"
            name="password"
            fullWidth
            variant="outlined"
            required
            onChange={handleInputChange}
          />
        </Box>
        <Box sx={{ mb: 3 }}>
          <Typography
            variant="subtitle1"
            component="label"
            sx={{ fontWeight: "semibold", mb: 1, display: "block" }}
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
            required
            onChange={handleInputChange}
          />
        </Box>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{
            bgcolor: "blue",
            color: "white",
            fontWeight: "semibold",
            py: 2,
          }}
        >
          Sign Up
        </Button>
      </form>
      <Box sx={{ mt: 3, textAlign: "center" }}>
        <Typography variant="body2">
          Already have an account?
          <Button onClick={() => handleComponentChange(LoginForm)} style={{ margin: 10 }}>
            Login
          </Button>
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpForm;
