"use client"

import React from 'react';
import { Card, CardContent, Typography, Grid, CardMedia } from '@mui/material';
import hotels from '../img/hotel.jpg'

interface HotelCardProps {
    hotel: {
        hotel_name: String;
        continent: String;
        country_name: String;
        city_name: String;
        no_rooms: Number;
        rating: Number;
        price: Number;
        numberOfReviews: Number;
        facilities: String;
        days_available: String;
    };
}

const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardMedia component='img' image={hotels.src} height="194" />
                <CardContent>
                    <Typography variant="body2" component="div">
                        {hotel.hotel_name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                    {hotel.city_name}, {hotel.country_name}, {hotel.continent}
                    </Typography>
                    {/* <Typography variant="body2" color="text.secondary">
                        No. of Rooms: {hotel.no_rooms.toString()}
                    </Typography> */}
                    <Typography variant="body2" color="text.secondary">
                        Rating: {hotel.rating.toString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {hotel.price.toString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        No. of Reviews: {hotel.numberOfReviews.toString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Facilities: {hotel.facilities}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Days Available: {hotel.days_available}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default HotelCard;
