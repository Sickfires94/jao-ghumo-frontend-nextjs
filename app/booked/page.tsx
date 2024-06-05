"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ButtonAppBar from '../components/Navbar';
import axios from 'axios';
import { getCookie } from 'typescript-cookie';
import FlightCard from '../cards/flight';

const OwnedPage: React.FC = () => {
    const [flights, setFlights] = useState<any[]>([]);

    const fetchProfileData = async () => {
        try {
            const token = getCookie('token');
            const response = await axios.post('http://localhost:3000/flights/bookings', {}, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            const  flights  = response.data;
            setFlights(flights);

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
                    Booked Page
                </Typography>
                <Typography variant="body1" gutterBottom>
                </Typography>

                <Grid container spacing={2}>
                    {
                        flights.map((flight, index) => (
                            <FlightCard key={index} flight={flight} />
                        ))
                    
                }
                </Grid>
            </Container>
        </>
    );
};

export default OwnedPage;
