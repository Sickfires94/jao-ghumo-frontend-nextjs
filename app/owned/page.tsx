"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ButtonAppBar from '../components/Navbar';
import axios from 'axios';
import { getCookie } from 'typescript-cookie';
import HotelCard from '../cards/hotel';
import AttractionCard from '../cards/attraction';
import FlightCard from '../cards/flight';

const OwnedPage: React.FC = () => {
    const [hotels, setHotels] = useState<any[]>([]);
    const [attractions, setAttractions] = useState<any[]>([]);
    const [airports, setAirports] = useState<any[]>([]);

    const fetchProfileData = async () => {
        try {
            const token = getCookie('token');
            const response = await axios.post('http://localhost:3000/users/profile', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const { hotels, attractions, airports } = response.data;
            setHotels(hotels);
            setAttractions(attractions);
            setAirports(airports);
        } catch (error) {
            console.error('Error fetching profile data:', error);
        }
    };

    useEffect(() => {
        fetchProfileData();
    }, []);

    return (
        <>
            <ButtonAppBar />

            <Container>
                <Typography variant="h4" component="div" gutterBottom>
                    Owned Page
                </Typography>
                <Typography variant="body1" gutterBottom>
                </Typography>

                <Grid container spacing={2}>
                    {hotels.map((hotel, index) => (
                        <HotelCard key={index} hotel={hotel} />
                    ))}
                    {attractions.map((attraction, index) => (
                        <AttractionCard key={index} attraction={attraction} />
                    ))}
                    {airports.map((flight, index) => (
                        <FlightCard key={index} flight={flight} />
                    ))}
                </Grid>
            </Container>
        </>
    );
};

export default OwnedPage;
