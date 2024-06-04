'use client';

import React, { useState, useEffect } from 'react';
import { TextField, Button, Container, Typography, Avatar, Box, Link } from '@mui/material';
import { styled } from '@mui/system';
import { getCookie } from 'typescript-cookie';
import ButtonAppBar from '../components/Navbar';

interface User {
    email: string;
    firstname: string;
    lastname: string;
}

const FormContainer = styled(Container)(({ theme }) => ({
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    marginTop: theme.spacing(8),
}));

const Form = styled('form')(({ theme }) => ({
    width: '100%',
    marginTop: theme.spacing(1),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
    margin: theme.spacing(3, 0, 2),
}));

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User>({
        email: '',
        firstname: '',
        lastname: '',
    });
    const [image, setImage] = useState<string | ArrayBuffer | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const token = getCookie('token');
                const response = await fetch('http://localhost:3000/users/prof', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${token}`
                    },
                });

                if (response.ok) {
                    const data = await response.json();
                    setUser({
                        email: data.email,
                        firstname: data.firstname,
                        lastname: data.lastname,
                    });
                } else {
                    console.error('Failed to fetch user data:', response.statusText);
                }
            } catch (error) {
                console.error('Failed to fetch user data:', error);
            }
        };

        fetchData();
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser({
            ...user,
            [name]: value,
        });
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log('User updated:', user);
    };

    const handleDeactivate = async () => {
        try {
            const token = getCookie('token');
            const response = await fetch('http://localhost:3000/users/del_acc', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: JSON.stringify({ email: user.email })
            });

            if (response.ok) {
                console.log('Account deactivated');
            } else {
                console.error('Failed to deactivate account:', response.statusText);
            }
        } catch (error) {
            console.error('Deactivation failed:', error);
        }
    };

    const handleChangePassword = () => {
        // Add code to handle password change
        console.log('Change Password clicked');
    };

    const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImage(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };

    return (
        <>
            <ButtonAppBar />
            <FormContainer  maxWidth="xs">
                <Avatar 
                    alt="Profile Picture" 
                    src={typeof image === 'string' ? image : '/default-profile-pic.jpg'} 
                    sx={{ width: 150, height: 150 }} // Increase the size here
                />
                <input
                    accept="image/*"
                    style={{ display: 'none' }}
                    id="icon-button-file"
                    type="file"
                    onChange={handleImageUpload}
                />
                <label htmlFor="icon-button-file">
                    <Button component="span" variant="text">
                        Import Image
                    </Button>
                </label>
                <Typography component="h1" variant="h5">
                    {user.firstname} {user.lastname}
                </Typography>
                <Typography variant="subtitle1" gutterBottom>
                    {user.email}
                </Typography>
                <Form onSubmit={handleSubmit}>
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Your Email Address"
                        name="email"
                        autoComplete="email"
                        value={user.email}
                        onChange={handleChange}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="firstname"
                        label="First Name"
                        name="firstname"
                        autoComplete="fname"
                        value={user.firstname}
                        onChange={handleChange}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <TextField
                        variant="outlined"
                        margin="normal"
                        required
                        fullWidth
                        id="lastname"
                        label="Last Name"
                        name="lastname"
                        autoComplete="lname"
                        value={user.lastname}
                        onChange={handleChange}
                        InputProps={{
                            readOnly: true,
                        }}
                    />
                    <SubmitButton
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        onClick={handleDeactivate}
                    >
                        Deactivate Account
                    </SubmitButton>
                    <SubmitButton
                        type="button"
                        fullWidth
                        variant="contained"
                        color="secondary"
                        onClick={handleChangePassword}
                    >
                        Change Password
                    </SubmitButton>
                </Form>
            </FormContainer>
        </>
    );
};

export default UserProfile;
