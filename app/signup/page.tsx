'use client'

import React, { useState } from 'react';
import './signUp.css';
import signup from '../img/signup.jpg';
import googleIcon from '../img/google-icon.png';
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FormEvent } from 'react'

function SignUp() {
    // const [formData, setFormData] = useState({
    //     firstname: '',
    //     lastname: '',
    //     email: '',
    //     password: '',
    //     role: '',
    // });

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // };

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const response = await fetch('http://localhost:3000/auth/signup', {
                method: 'POST',
                body: formData,
            })
            redirect("/");
        } catch (error) {
            // Handle login error
            console.error('Login failed:', error);
        }
    };

    return (
        <div className="container">
            <h1 className="heading">SignUp Form</h1>
            <form className="form_container" onSubmit={handleSubmit}>
                <div className="left">
                    <Image className="img" src={signup} alt="signup" />
                </div>
                <div className="right">
                    <h2 className="from_heading">SignUp</h2>
                    <input
                        type="text"
                        className="input"
                        placeholder="First Name"
                        name="firstname"
                    />
                    <input
                        type="text"
                        className="input"
                        placeholder="Last Name"
                        name="lastname"
                    />
                    <input
                        type="email"
                        className="input"
                        placeholder="Email"
                        name="email"
                    />
                    <input
                        type="password"
                        className="input"
                        placeholder="Password"
                        name="password"
                    />
                    <select
                        name="role"
                    >
                        <option value="">Pick a Role: </option>
                        <option value="owner">Owner</option>
                        <option value="user">User</option>
                    </select>
                    <button type="button" className="button">SignUp</button>
                    <p className="text">or</p>
                    <button className="google-button">
                        <Image src={googleIcon} alt="google icon" />
                        <span>SignIn with Google</span>
                    </button>
                    <p className="text">
                        Already Have Account? <Link href="../login">Login</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default SignUp;