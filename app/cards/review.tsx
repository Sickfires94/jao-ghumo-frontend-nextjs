"use client"

import React from 'react';
import { Card, CardContent, Typography, Grid, ownerDocument } from '@mui/material';


const ReviewCard = (review: review) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardContent>
                    <Typography variant="h5" component="div">
                        {review.owner}
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
