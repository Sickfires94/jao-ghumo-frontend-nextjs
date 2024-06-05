"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid, AppBar } from '@mui/material';
import ButtonAppBar from '../components/Navbar';
import axios from 'axios';
import { getCookie } from 'typescript-cookie';
import FlightCard from '../cards/flight';
import loginCard from '../cards/login';
import { RootState } from '../redux/store';
import { useSelector } from 'react-redux';

const OwnedPage: React.FC = () => {
    const [flights, setFlights] = useState<any[]>([]);

    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    
    console.log("logged in: " + isAuthenticated)

    if (!isAuthenticated){
        return (<>
        <ButtonAppBar/>
        
        {loginCard("See Bookings")}
            </>);
    }

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
