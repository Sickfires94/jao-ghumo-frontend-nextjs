"use client"

import React from 'react'
import Navbar from '../components/Navbar';
import { Typography } from '@mui/material';
import ReviewCard from '../cards/review';
import { useSearchParams } from 'next/navigation';

const attraction_profile = async () => {

    const searchParams = useSearchParams();
    let id : any = searchParams.get("id");
    
    const res = await fetch('http://localhost:3000/attractions/get',
        {
            method: 'POST', 
            headers: { 'Content-Type': 'application/json' }, // This line is important for backend to recognize the input
            body: JSON.stringify({
                _id: id
            })
        }
    )
    const attraction: attraction = await res.json();

    const reviews: review[] = attraction.reviews;
    const review : review = reviews[0]

    return (
        <div>
            <Navbar />
            <Typography variant="h3" component="div">
                {attraction.name}
            </Typography>
            <div>
                {reviews.map((review) => (
  <ReviewCard key={review._id} review={review}/> 
))} 
            </div>
        </div> 
    )
}

export default attraction_profile        