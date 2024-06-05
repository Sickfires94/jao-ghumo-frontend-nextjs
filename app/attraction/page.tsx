'use client';

import React, { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import { Typography, TextField, Button } from '@mui/material';
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
        const token = getCookie('token');

        fetch('http://localhost:3000/attractions/update', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
             },
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
    const handleSaveChanges = () => {
        // Perform your save changes logic here
        console.log("Changes saved");
        
        // Refresh the page
        window.location.reload();
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
                        <TextField
                            name="name"
                            label="Name"
                            value={editData?.name}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="description"
                            label="Description"
                            value={editData?.description}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="features"
                            label="Features"
                            value={editData?.features}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="timeOpen"
                            label="Opening Time"
                            value={editData?.timeOpen}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="priceRange"
                            label="Price Range"
                            value={editData?.priceRange}
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
                            name="phone"
                            label="Phone Number"
                            value={editData?.phone}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="address"
                            label="Address"
                            value={editData?.address}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="country"
                            label="Country"
                            value={editData?.country}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="state"
                            label="State"
                            value={editData?.state}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="city"
                            label="City"
                            value={editData?.city}
                            onChange={handleEditChange}
                            fullWidth
                        />
                        <TextField
                            name="type"
                            label="Type"
                            value={editData?.type}
                            onChange={handleEditChange}
                            fullWidth
                        />

                        <Button type="submit" variant="contained" color="primary" onClick={handleSaveChanges} >
                            Save Changes
                        </Button>
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
