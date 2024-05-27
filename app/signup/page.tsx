'use client'

import React, { useState, FormEvent } from "react";
import './signup.css';
import signup from '../img/signup.jpg';
import googleIcon from '../img/google-icon.png';
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import Head from 'next/head';
import { Switch, FormControlLabel } from '@mui/material';

function Signup() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [isAdmin, setIsAdmin] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/auth/signup', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password, firstname, lastname, role: isAdmin ? 'admin' : 'user' }),
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`Signup failed with status ${response.status}`);
            }

            const data = await response.json();

            console.log('Signup successful:', data);
            // Redirect or handle successful signup

        } catch (error: any) {
            console.log("ERROR??!!!");
            setErrorMessage(error.message);
        }
    };

    const handleRoleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setIsAdmin(event.target.checked);
    };

    return (
        <div className="container" style={{ justifyContent: "center" }}>
            <Head>
                <link rel="icon" href="/favicon.ico" />
            </Head>
            <h1 className="heading">Jao Ghumo</h1>
            <form className="form_container" onSubmit={handleSubmit}>
                <div className="left">
                    <Image className="img" src={signup} alt="signup" />
                </div>
                <div className="right">
                    <h2 className="from_heading">Signup</h2>

                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        className="input"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        className="input"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    <label htmlFor="firstname">First Name:</label>
                    <input
                        type="text"
                        id="firstname"
                        className="input"
                        value={firstname}
                        onChange={(e) => setFirstname(e.target.value)}
                        required
                    />
                    <label htmlFor="lastname">Last Name:</label>
                    <input
                        type="text"
                        id="lastname"
                        className="input"
                        value={lastname}
                        onChange={(e) => setLastname(e.target.value)}
                        required
                    />

                    <div>
                        <FormControlLabel
                            control={<Switch checked={isAdmin} onChange={handleRoleChange} />}
                            label={isAdmin ? 'Admin' : 'User'}
                        />
                    </div>

                    <button className="button" type="submit">Signup</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <p className="text">
                        Already have an account? <Link href="../login">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Signup;
