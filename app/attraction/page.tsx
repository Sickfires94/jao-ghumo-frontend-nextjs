'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Typography, TextField, Button, Box } from '@mui/material';
import ReviewCard from '../cards/review';
import { useSearchParams } from 'next/navigation';
import ReviewForm from '../components/ReviewForm';
import { getCookie } from 'typescript-cookie';

interface Attraction {
    _id: string;
    name: string;
    description: string;
    location: string;
    rating: number;
    reviews: Review[];
    owner: string;
    [key: string]: any;
}

interface Review {
    _id: string;
    [key: string]: any;
}

const AttractionProfile: React.FC = () => {
    const [attraction, setAttraction] = useState<Attraction | null>(null);
    const [userEmail, setUserEmail] = useState<string>('');
    const [editData, setEditData] = useState<Attraction | null>(null);
    const searchParams = useSearchParams();
    const id: any = searchParams.get('id');

    useEffect(() => {
        const token = getCookie('token');

        const fetchAttractionData = () => {
            fetch('http://localhost:3000/attractions/get', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ _id: id })
            })
            .then(res => res.json())
            .then((attractionData: Attraction) => {
                setAttraction(attractionData);
                setEditData(attractionData);
            });
        };

        const fetchUserData = () => {
            fetch('http://localhost:3000/users/prof', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
                body: JSON.stringify({ _id: id })
            })
            .then(res => res.json())
            .then(userData => {
                setUserEmail(userData.email);
            });
        };

        fetchAttractionData();
        fetchUserData();
    }, [id]);

    if (!attraction) {
        return <div>Loading...</div>;
    }

    const isOwner = attraction.owner === userEmail;

    const handleEditChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setEditData({
            ...editData!,
            [e.target.name]: e.target.value
        });
    };

    const handleEditSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        fetch('http://localhost:3000/attractions/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(editData)
        })
        .then(res => {
            if (res.ok) {
                alert('Attraction information updated successfully');
                return res.json();
            } else {
                alert('Failed to update attraction information');
                throw new Error('Failed to update');
            }
        })
        .then(updatedAttraction => {
            setAttraction(updatedAttraction);
        })
        .catch(error => console.error('Error:', error));
    };

    return (
        <div>
            <Navbar />
            <Typography variant="h3" component="div">
                {attraction.name}
            </Typography>
            {isOwner ? (
                <div>
                    <Typography variant="h5">Edit Attraction Information</Typography>
                    <form onSubmit={handleEditSubmit}>
                    <Box display="flex" flexDirection="column" gap={2} maxWidth={345}>
                            <TextField
                                name="name"
                                label="Name"
                                value={editData?.name}
                                onChange={handleEditChange}
                            />
                            <TextField
                                name="description"
                                label="Description"
                                value={editData?.description}
                                onChange={handleEditChange}
                            />
                            <TextField
                                name="features"
                                label="Features"
                                value={editData?.features}
                                onChange={handleEditChange}
                            />
                            <TextField
                                name="timeOpen"
                                label="Opening Time"
                                value={editData?.timeOpen}
                                onChange={handleEditChange}
                            />
                            <TextField
                                name="priceRange"
                                label="Price Range"
                                value={editData?.priceRange}
                                onChange={handleEditChange}
                            />
                            <TextField
                                name="website"
                                label="Website"
                                value={editData?.website}
                                onChange={handleEditChange}
                            />
                            <TextField
                                name="phone"
                                label="Phone Number"
                                value={editData?.phone}
                                onChange={handleEditChange}
                            />
                            <TextField
                                name="address"
                                label="Address"
                                value={editData?.address}
                                onChange={handleEditChange}
                            />
                            <TextField
                                name="country"
                                label="Country"
                                value={editData?.country}
                                onChange={handleEditChange}
                            />
                            <TextField
                                name="state"
                                label="State"
                                value={editData?.state}
                                onChange={handleEditChange}
                            />
                            <TextField
                                name="city"
                                label="City"
                                value={editData?.city}
                                onChange={handleEditChange}
                            />
                            <TextField
                                name="type"
                                label="Type"
                                value={editData?.type}
                                onChange={handleEditChange}
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
                        {attraction.reviews.map((review) => (
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

export default AttractionProfile;
