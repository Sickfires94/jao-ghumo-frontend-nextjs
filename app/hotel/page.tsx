import React from 'react'
import Navbar from '../components/Navbar';
import { Typography } from '@mui/material';
import ReviewCard from '../cards/review';

const hotel_profile = async (id: string) => {
    // test id = 665bf7f8a3ccfb2aaf512c72

    const res = await fetch('http://localhost:3000/hotels/get',
        {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' }, // This line is important for backend to recognize the input
            body: JSON.stringify({
                _id: '665bf7f8a3ccfb2aaf512c72'
            })
        }
    )
    const hotel: hotel = await res.json();

    const reviews: review[] = hotel.reviews;

    return (
        <div>
            <Navbar />
            <Typography variant="h1" component="div">
                {hotel.hotel_name}
            </Typography>
            <div>
                {reviews.map(ReviewCard)}
            </div>
        </div>
    )
}

export default hotel_profile         