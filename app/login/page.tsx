import React, { useState } from "react";
import './login.css'
import login from '../img/login.jpg'
import googleIcon from '../img/google-icon.png'
import { redirect } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { FormEvent } from 'react'

function Login() {

    // const [formData, setFormData] = useState({
    //     email: '',
    //     password: '',
    //     firstname: '',
    //     lastname: '',
    //     role: 'User'
    // });

    // const handleChange = (e) => {
    //     setFormData({ ...formData, [e.target.name]: e.target.value });
    // }; 

    const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
        try {
            event.preventDefault()
            const formData = new FormData(event.currentTarget)
            const response = await fetch('http://localhost:3000/api/submit', {
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
        <div className="container" style={{ justifyContent: "center" }}>
            <h1 className="heading">Login Form</h1>
            <form className="form_container">
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
                    <Link href="../"><button className="button" type="submit">Login</button></Link>

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