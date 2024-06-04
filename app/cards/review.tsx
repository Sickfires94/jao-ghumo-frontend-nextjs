import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material';

const ReviewCard = ({ review }) => {
    const [owner, setOwner] = useState(null);

    useEffect(() => {
        const fetchOwner = async () => {
            try {
                const res = await fetch('http://localhost:3000/users/get', {
                    method: 'POST', 
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ _id: review.owner })
                });

                if (res.ok) {
                    const ownerData = await res.json();
                    setOwner(ownerData);
                } else {
                    console.error('Failed to fetch owner data');
                }
            } catch (error) {
                console.error('Error fetching owner data:', error);
            }
        };

        fetchOwner();
    }, [review.owner]);

    if (!owner) {
        return <div>Loading...</div>;
    }

    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardContent>
                    <Typography variant="h6" component="div">
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
