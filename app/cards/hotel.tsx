"use client";

import React from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, Button } from '@mui/material';
import hotels from '../img/hotel.jpg';
import Link from 'next/link';
import { useRouter } from 'next/navigation'

interface HotelCardProps {
    hotel: {
        _id: string;
        hotel_name?: string;
        continent?: string;
        country_name?: string;
        city_name?: string;
        no_rooms?: number;
        rating?: number;
        price?: number;
        numberOfReviews?: number;
        facilities?: string;
        days_available?: string;
    };
}



const HotelCard: React.FC<HotelCardProps> = ({ hotel }) => {
    const router = useRouter()
    const onClick = async () => {
        router.push("/hotel?id=" + hotel._id);
    }
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardMedia component='img' image={hotels.src} height="194" />
                <CardContent>
                    <Typography variant="body2" component="div">
                        {hotel.hotel_name || 'No name available'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {hotel.city_name || 'Unknown City'}, {hotel.country_name || 'Unknown Country'}, {hotel.continent || 'Unknown Continent'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Rating: {hotel.rating?.toString() || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Price: {hotel.price?.toString() || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        No. of Reviews: {hotel.numberOfReviews?.toString() || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Facilities: {hotel.facilities || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Days Available: {hotel.days_available || 'N/A'}
                    </Typography>
                    <Button onClick={onClick}>
                        Profile
                    </Button>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default HotelCard;
