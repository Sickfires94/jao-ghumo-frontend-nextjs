'use client'

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Typography, TextField, Button, Box } from '@mui/material';
import ReviewCard from '../cards/review';
import { useSearchParams } from 'next/navigation';
import ReviewForm from '../components/ReviewForm';
import { getCookie } from 'typescript-cookie'; // Ensure you have installed 'typescript-cookie'


const HotelProfile: React.FC = () => {
    const [hotel, setHotel] = useState<hotel | null>(null);
    const [userEmail, setUserEmail] = useState<string>('');
    const [editData, setEditData] = useState<hotel | null>(null);
    const searchParams = useSearchParams();
    const id:any = searchParams.get('id');

    useEffect(() => {
        const token = getCookie('token');

        const fetchHotelData = async () => {
            const res = await fetch('http://localhost:3000/hotels/get', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ _id: id })
            });
            const hotelData: hotel = await res.json();
            setHotel(hotelData);
            setEditData(hotelData);  // Pre-fill edit form with hotel data
        };

        const fetchUserData = async () => {
            const res = await fetch('http://localhost:3000/users/prof', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' , 'Authorization': `Bearer ${token}`},
                body: JSON.stringify({ _id: id })
            });
            const userData = await res.json();
            setUserEmail(userData.email);
        };

        fetchHotelData();
        fetchUserData();
    }, [id]);

    if (!hotel) {
        return <div>Loading...</div>;
    }

    const isOwner = hotel.owner === userEmail;

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditData({
            ...editData!,
            [e.target.name]: e.target.value
        });
    };

    const handleEditSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const res = await fetch('http://localhost:3000/hotels/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editData)
        });

        if (res.ok) {
            alert('Hotel information updated successfully');
            const updatedHotel = await res.json();
            setHotel(updatedHotel);
        } else {
            alert('Failed to update hotel information');
        }
    };

    return (
        <div>
            <Navbar />
            <Typography variant="h3" component="div">
                {hotel.hotel_name}
            </Typography>
            {isOwner ? (
                <div>
                    <Typography variant="h5">Edit Hotel Information</Typography>
                    <form onSubmit={handleEditSubmit}>
                    <Box display="flex" flexDirection="column" gap={2} maxWidth={345}>
                        <TextField
                            name="hotel_name"
                            label="Hotel Name"
                            value={editData?.hotel_name}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="continent"
                            label="Continent"
                            value={editData?.continent}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="city_name"
                            label="City Name"
                            value={editData?.city_name}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="no_rooms"
                            label="Number of Rooms"
                            type="number"
                            value={editData?.no_rooms}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="rating"
                            label="Rating"
                            type="number"
                            value={editData?.rating}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="price"
                            label="Price"
                            type="number"
                            value={editData?.price}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="facilities"
                            label="Facilities"
                            value={editData?.facilities}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="days_available"
                            label="Days Available"
                            value={editData?.days_available}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="website"
                            label="Website"
                            value={editData?.website}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="contact"
                            label="Contact"
                            value={editData?.contact}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <Button type="submit" variant="contained" color="primary">
                            Save Changes
                        </Button>
                        </Box>
                    </form>
                </div>
            ) : (
                <div>
                    <div>
                        {hotel.reviews.map((review) => (
                            <ReviewCard key={review._id} review={review} />
                        ))}
                    </div>
                    <div>
                        <ReviewForm _id={id} /> 
                    </div>
                </div>
            )}
        </div>
    );
};

export default HotelProfile;
