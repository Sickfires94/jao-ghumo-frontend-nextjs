"use client";

import React from 'react';
import { Card, CardContent, Typography, Grid, CardMedia } from '@mui/material';
import plane from '../img/plane.webp';
import Link from 'next/link';

interface FlightCardProps {
    flight: {
        _id: string;
        flight_id?: string;
        plane_id?: string;
        departure_airport?: string;
        arrival_airport?: string;
        departure_time?: string;
        arrival_time?: string;
        seats_total?: number;
        seats_booked?: number;
        ticket_price?: number;
    };
}

const FlightCard: React.FC<FlightCardProps> = ({ flight }) => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardMedia component='img' image={plane.src} height="194" />
                <CardContent>
                    <Typography variant="body2" color="text.secondary">
                        Departure: {flight.departure_airport || 'N/A'} at {flight.departure_time ? new Date(flight.departure_time).toLocaleString() : 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Arrival: {flight.arrival_airport || 'N/A'} at {flight.arrival_time ? new Date(flight.arrival_time).toLocaleString() : 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Seats Total: {flight.seats_total?.toString() || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Seats Booked: {flight.seats_booked?.toString() || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Ticket Price: ${flight.ticket_price?.toString() || 'N/A'}
                    </Typography>
                    <Typography variant="body2" component="div">
                        {flight.flight_id || 'N/A'}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        Plane ID: {flight.plane_id || 'N/A'}
                    </Typography>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default FlightCard;
