import React from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, ownerDocument, Rating } from '@mui/material';

import hotel from '../img/hotel-bg.jpeg'

const ReviewCard = async ({ review }: { review: review }) => {
    const res = await fetch('http://localhost:3000/users/get',
    {
        method: 'POST', 
        headers: { 'Content-Type': 'application/json' }, // This line is important for backend to recognize the input
        body: JSON.stringify({
            _id: review.owner
        })
    }
);
    const owner : user = await res.json()
    
    return (
        <Grid sx={{ mt: 3, maxWidth: 345, boxShadow: "2px 2px 2px 2px" }}>
            <Card>
            <CardMedia component='img' image={hotel.src} height="194" />
                <CardContent>
                    <Typography variant="h6" component="div">
                        {owner.email}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        Rating: {review.rating.toString()}
                    </Typography> */}
                    <Rating value={review.rating} name='read-only' readOnly/>
                    <Typography variant="body2" color="text.secondary">
                        {review.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Posted: {new Date(review.creation_time).toLocaleString()}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default ReviewCard;
