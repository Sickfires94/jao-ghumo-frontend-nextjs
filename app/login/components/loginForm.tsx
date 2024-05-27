import React, { useState } from "react";
import './login.css'
import login from '../img/login.jpg'
import googleIcon from '../img/google-icon.png'
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FormEvent } from 'react'

const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    try {
        event.preventDefault()
        const formData = new FormData(event.currentTarget)
        const response = await fetch('http://localhost:3000/auth/login', {
            method: 'POST',
            body: formData,
        })
        const data = await response.json()
        // if (data.msg === "Logged in")
        //     redirect("../");
        console.log("data = " + data.data);
    } catch (error) {
        // Handle login error
        console.error('Login failed:', error);
    }
};


const loginForm = () => {
    return (
        <div>   <h1 className="heading">Login Form</h1>
            <form className="form_container" onSubmit={handleSubmit}>
                <div className="left">
                    <Image className="img" src={login} alt="login" />
                </div>
                <div className="right">
                    <h2 className="from_heading">Login</h2>

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
                    <button className="button" type="submit">Login</button>

                    <p className="text">or</p>
                    <button className="google-button">
                        <Image src={googleIcon} alt="google icon" />
                        <span>SignIn with Google</span>
                    </button>
                    <p className="text">
                        New Here? <Link href="../signup">SignUp</Link>
                    </p>
                </div>
            </form></div>
    )
}

export default loginForm