"use client"

import React from 'react';
import { Card, CardContent, Typography, Grid, CardMedia, CardActions, Button } from '@mui/material';
import plane from '../img/plane.webp'

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
                    <Typography variant="body2" component="div">
                        {flight.flight_id}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Plane ID: {flight.plane_id}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" size="small">
                        <strong>Book</strong>
                    </Button>
                </CardActions>
            </Card>
        </Grid>
    );
};

export default FlightCard;
