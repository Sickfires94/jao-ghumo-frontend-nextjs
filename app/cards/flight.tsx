"use client"

import React from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, CardActions, Button } from '@mui/material';
import plane from '../img/plane.webp'
import axios from 'axios';
import { getCookie } from 'typescript-cookie';
// import { useSelector } from 'react-redux';
// import { RootState } from '../redux/store';

interface FlightCardProps {
    flight: {
        flight_id: string;
        plane_id: string;
        departure_airport: string;
        arrival_airport: string;
        departure_time: string;
        arrival_time: string;
        seats_total: number;
        seats_booked: number;
        ticket_price: number;
    };
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {

    // const token = useSelector((state: RootState) => state.auth.token);
    const handleBooking = async () => {
        const bookingData = {
            flight_id: flight.flight_id,
            plane_id: flight.plane_id,
        };

        const token = getCookie('token')
        console.log('Token:', token); // Log the token to check if it is retrieved correctly

        try {
            const response = await axios.post('http://localhost:3000/flights/booking', bookingData, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`, // Ensure token is in the correct format
                },
            });
            if (response.status === 200) {
                alert('Booking successful!');
            }
        } catch (error) {
            console.error('Booking error:', error);
            alert('Booking failed. Please try again.');
        }
    };
    
    
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardMedia component='img' image={plane.src} height="194" />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Departure: {flight.departure_airport} at {new Date(flight.departure_time).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Arrival: {flight.arrival_airport} at {new Date(flight.arrival_time).toLocaleString()}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Seats Total: {flight.seats_total}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Seats Booked: {flight.seats_booked}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Ticket Price: ${flight.ticket_price}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Flight ID: {flight.flight_id || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Plane ID: {flight.plane_id}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small" onClick={handleBooking}>
                        <strong>Book</strong>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default FlightCard;
