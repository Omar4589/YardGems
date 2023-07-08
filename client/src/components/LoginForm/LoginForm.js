import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import { Typography } from "@mui/material";
import { Link as RouterLink } from "react-router-dom";
import Container from "@mui/material/Container";
import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { LOGIN_USER } from "../../utils/mutations";
import Auth from "../../utils/auth";
import styles from "./styles";
import appName from "../../assets/images/appName.jpg";
import greenGem from "../../assets/images/greenGem.png";

export default function SignIn() {
  const [userFormData, setUserFormData] = useState({ email: "", password: "" }); // setting form in empty string to initalize the state
  const [login, { error }] = useMutation(LOGIN_USER);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({ email: data.get("email"), password: data.get("password") });
    try {
      const { data } = await login({
        variables: { ...userFormData },
      });

      Auth.login(data.login.token);
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
    <Container sx={{ ...styles.mainContainer }} maxWidth="sm">
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
