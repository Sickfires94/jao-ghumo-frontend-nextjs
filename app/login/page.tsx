'use client'

import React, { useState } from "react";
import './login.css'
import googleIcon from '../img/google-icon.png'
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FormEvent } from 'react'
import { cookies } from 'next/headers'
import saveCookie from "./components/cookieSave";
import getCookies from "../components/cookieGet";
import redirector from "../components/redirector";
import { getCookie, setCookie } from 'typescript-cookie'
import { useRouter } from 'next/navigation'
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import MuiLink from '@mui/material/Link';
import {login} from '../redux/authSlice'
import { useDispatch } from "react-redux";
import { setUser } from "../redux/userSlice";

const defaultTheme = createTheme();



interface login_res {
    msg: string,
    token: string,
    role: string
}

function Login() {

    const dispatch = useDispatch();
    const router = useRouter();

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // }; 

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3000/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`Login failed with status ${response.status}`);
            }

            const data = await response.json();


            // Handle successful login (e.g., redirect to home page)
            console.log('Login successful:', data);
            const token = data.token
            dispatch(login(token))
            dispatch(setUser({
              firstname: data.firstname,
              lastname: data.lastname,
              role: data.role,
            }));
            setCookie("token", token);

            console.log("token = " + getCookie("token"))
            // redirector();
            router.push("../")
            console.log("redirected");
            // ... (redirect or other actions)

        } catch (error: any) {
            console.log("ERROR??!!!")
            setErrorMessage(error.message);
        }
    };


    return (
        <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Login
          </Typography>
          <Box component="form" onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={((e) => setEmail(e.target.value))}
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
              onChange={((e) => setPassword(e.target.value))}
            />
            <FormControlLabel
              control={<Checkbox value="remember" color="primary" />}
              label="Remember me"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Login
            </Button>
            {errorMessage && <p className="error-message">{errorMessage}</p>}
            <Grid container>
              <Grid item>
                <MuiLink component={Link} href="../signup" variant="body2">
                  {"Don't have an account? Sign Up"}
                </MuiLink>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
    );
}

export default Login;
