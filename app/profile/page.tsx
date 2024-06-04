"use client";


import React, { useState, useEffect } from 'react';
import './profile.css'; // Make sure to save the provided CSS as UserProfile.css
import ButtonAppBar from '../components/Navbar'
import { getCookie } from 'typescript-cookie'; // Ensure you have installed 'typescript-cookie'

interface User {
    email: string;
    firstname: string;
    lastname: string;
}

const UserProfile: React.FC = () => {
    const [user, setUser] = useState<User>({
        email: '',
        firstname: '',
        lastname: '',
    });

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

            
            }
            catch (error) {
            console.error('Deactivation failed:', error);
        }
    };

    const handleChangePassword = () => {
        // Add code to handle password change
        console.log('Change Password clicked');
    };

    return (
        <>
            <ButtonAppBar />
            <div className="user-profile">
                <div className="header">Profile</div>
                <form onSubmit={handleSubmit} className="items">
                    <div className="item">
                        <label htmlFor="email">Email:</label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            value={user.email}
                            onChange={handleChange}
                            className="search-input"
                            readOnly
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="firstname">First Name:</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={user.firstname}
                            onChange={handleChange}
                            className="search-input"
                            readOnly
                        />
                    </div>
                    <div className="item">
                        <label htmlFor="lastname">Last Name:</label>
                        <input
                            type="text"
                            id="lastname"
                            name="lastname"
                            value={user.lastname}
                            onChange={handleChange}
                            className="search-input"
                            readOnly
                        />
                    </div>
                    <button type="button" className="search-button" onClick={handleDeactivate}>Deactivate Account</button>
                    <button type="button" className="search-button" onClick={handleChangePassword}>Change Password</button>
                </form>
            </div>
        </>
    );
};

export default UserProfile;
