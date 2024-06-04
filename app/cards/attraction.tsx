"use client"

import React from 'react';
import { Card, CardContent, Typography, Grid, CardMedia } from '@mui/material';
import attractions from '../img/attraction.jpeg'
import restaurants from '../img/restaurant.jpg'
import amusementPark from '../img/amusement park.jpg'

interface AttractionCardProps {
    attraction: {
        name: String;
        city: String;
        state: String;
        type: String;
        country: String;
        description: String;
        phone: String;
        address: String;
        website: String;
        position: Number;
        features: String;
        timeOpen: String;
        priceRange: Number;
        rating: Number;
        numberOfReviews: Number;
    };
}

const AttractionCard: React.FC<AttractionCardProps> = ({ attraction }) => {

    const imageSrc = attraction.type === 'restaurant' ? restaurants: attraction.type === 'amusement park' ? amusementPark: attractions
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardMedia component='img' image={imageSrc.src} height="194" />
                <CardContent>
                    <Typography variant="body2" component="div">
                        {attraction.name}
                    </Typography>
                    <Typography variant="body2" component="div">
                        {attraction.type}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {attraction.city}, {attraction.state}, {attraction.country}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Description: {attraction.description}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Phone Number: {attraction.phone}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Address: {attraction.address}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rating: {attraction.rating.toString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Opening Time: {attraction.timeOpen}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price Range: {attraction.priceRange.toString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        No. of Reviews: {attraction.numberOfReviews.toString()}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default AttractionCard;
