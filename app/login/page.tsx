'use client'

import React, { useState } from "react";
import './login.css'
import login from '../img/login.jpg'
import googleIcon from '../img/google-icon.png'
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FormEvent } from 'react'
import { cookies } from 'next/headers'
import saveCookie from "./components/cookieSave";
import getCookies from "../components/cookieGet";
import redirector from "./components/redirector";
import { getCookie, setCookie } from 'typescript-cookie'

interface login_res {
    msg: string,
    token: string,
    role: string
}

function Login() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [errorMessage, setErrorMessage] = useState(null);

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // }; 

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        try {
            const response = await fetch('http://localhost:3001/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            console.log(response);

            if (!response.ok) {
                throw new Error(`Login failed with status ${response.status}`);
            }

            const data = await response.json();


            // Handle successful login (e.g., redirect to home page)
            console.log('Login successful:', data);
            const token = data.token

            setCookie("token", token);

            console.log("token = " + getCookie("token"))
            // redirector();
            console.log("redirected");
            // ... (redirect or other actions)

        } catch (error: any) {
            console.log("ERROR??!!!")
            setErrorMessage(error.message);
        }
    };


    return (
        <div className="container" style={{ justifyContent: "center" }}>
            <h1 className="heading">Jao Ghumo</h1>
            <form className="form_container" onSubmit={handleSubmit}>
                <div className="left">
                    <Image className="img" src={login} alt="login" />
                </div>
                <div className="right">
                    <h2 className="from_heading">Login</h2>

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

                    <button className="button" type="submit">Login</button>
                    {errorMessage && <p className="error-message">{errorMessage}</p>}

                    <p className="text">or</p>
                    <button className="google-button">
                        <Image src={googleIcon} alt="google icon" />
                        <span>SignIn with Google</span>
                    </button>
                    <p className="text">
                        New Here? <Link href="../signup">SignUp</Link>
                    </p>
                </div>
            </form>
        </div>
    );
}

export default Login;