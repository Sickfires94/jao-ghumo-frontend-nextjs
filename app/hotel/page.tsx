'use client'

import React from 'react'
import Navbar from '../components/Navbar';
import { Typography } from '@mui/material';
import ReviewCard from '../cards/review';
import { useSearchParams } from "next/navigation";

const hotel_profile = async () => {
    // test id = 665bf7f8a3ccfb2aaf512c72

    const searchParams = useSearchParams();
    let id : any = searchParams.get("id");

    const res = await fetch('http://localhost:3000/hotels/get',
        {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, // This line is important for backend to recognize the input
            body: JSON.stringify({
                _id: id
            })
        }
    )
    const hotel: hotel = await res.json();

    const reviews: review[] = hotel.reviews;

    return (
        <div>
            <Navbar />
            <Typography variant="h3" component="div">
                {hotel.hotel_name}
            </Typography>
            <div>
                {reviews.map((review) => (
  <ReviewCard key={review._id} review={review}/> 
))} 
            </div>
        </div> 
    )
}

export default hotel_profile         