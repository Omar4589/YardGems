import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { LOGIN_USER } from '../../utils/mutations';
import Auth from '../../utils/auth';



export default function SignIn() {
    const [userFormData, setUserFormData] = useState({ email: '', password: '' }); // setting form in empty string to initalize the state
    const [login, { error }] = useMutation(LOGIN_USER);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setUserFormData({ ...userFormData, [name]: value });
      };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    console.log({email: data.get("email"),password: data.get("password")});
    try {
        const { data } = await login({
          variables: { ...userFormData },
        });
  
        Auth.login(data.login.token);
      } catch (err) {
        console.error(err);
      }
  
      setUserFormData({
        username: '',
        email: '',
        password: '',
      });

  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          boxShadow: 3,
          borderRadius: 2,
          px: 4,
          py: 6,
          marginTop: 8,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box component="h1" variant="h5" sx={{
            backgroundColor: '#4caf50',
            width: '90%',
            height: '4em',
            position:'relative',
            bottom: '100px',
            textAlign: 'center',
            paddingTop: '7%',
            borderRadius: 2,
            color:'whitesmoke'
        }}>Sign In
        <Box sx={{color:'#1b5e20', marginTop: '3%', letterSpacing:'.1em'}}>Welcome Back</Box>
        </Box>
        <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1, position: 'relative', bottom:'5em', padding:'5px' }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            autoFocus
            onChange={handleInputChange}
            value={userFormData.email}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            onChange={handleInputChange}
            value={userFormData.password}
          />
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2, backgroundColor: '#4caf50', padding:'1em' }}
          >
            Sign In
          </Button>
          <Grid container>
            <Grid item xs>
              <Link href="#" variant="body2">
                Forgot password?
              </Link>
            </Grid>
          </Grid>
        </Box>
        <Box>Happy Hunting...</Box>
      </Box>
    </Container>
  );
}