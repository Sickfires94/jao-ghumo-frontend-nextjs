import React from 'react';
import { Card, CardContent, Typography, Grid, ownerDocument } from '@mui/material';



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
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardContent> 
                    <Typography variant="h5" component="div">
                        {owner.email}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rating: {review.rating.toString()}
                    </Typography> 
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
