"use client"

import { useRouter } from 'next/navigation'
import React, { FormEvent, useState } from 'react'
import { useSelector } from 'react-redux';
import { RootState } from '../redux/store';
import { Box, Button, FormControlLabel, Grid, PropTypes, TextField } from '@mui/material';
import loginCard from '../cards/login';
import MuiLink from '@mui/material/Link';
import { getCookie } from 'typescript-cookie';

const ReviewForm = ({_id} : {_id: string}) => {

    const [rating, setRating] = useState('');
    const [description, setDescription] = useState('');
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const router = useRouter()

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    
    console.log("logged in: " + isAuthenticated)
    
    if (!isAuthenticated){
        return loginCard();
    }

    const token = getCookie("token")

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
      event.preventDefault()
        // console.log("token: " + token);
        try {
            const response = await fetch('http://localhost:3000/reviews/post', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'authorization': "bearer " + token },
                body: JSON.stringify({_id, rating, description }),
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`Post failed with status ${response.status}`);
            }

            const data = await response.json();

            console.log('Post successful:', data);

            // Redirect or handle successful Post
            // router.push("/hotel?id=" + _id)
            router.refresh()

        } catch (error: any) {
            setErrorMessage(error.message);
        }
    };


    return (
        <div> <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3, maxWidth: 345 }}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <TextField
              name="rating"
              required
              fullWidth
              type="number"
              InputProps={{ inputProps: { min: 0, max: 5 } }}
              id="rating"
              label="Rating"
              autoFocus
              onChange={(e) => setRating(e.target.value)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <TextField
              name="description"
              required
              fullWidth
              id="description"
              label="Description"
              autoFocus
              onChange={(e) => setDescription(e.target.value)}
            />
          </Grid>
        </Grid>
        <Button
          type="submit"
          fullWidth
          variant="contained"
          sx={{ mt: 3, mb: 2 }}
        >
          Post
        </Button>
        {errorMessage && <p className="error-message">{errorMessage}</p>}
        <Grid container justifyContent="flex-end">
        </Grid>
      </Box></div>
    )
}

export default ReviewForm

function setErrorMessage(message: any) {
    throw new Error('Function not implemented.');
}
