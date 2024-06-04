"use client"

import React from 'react';
import { Card, CardContent, Typography, Grid, ownerDocument, Button } from '@mui/material';
import router from 'next/router';
import Link from 'next/link';


const onSubmit = () => {
    router.push("/login")
}

const loginCard = async () => {
    return (
        <Grid sx={{ maxWidth: 300, marginTop: "1rem"}}>
            <Card>
                <CardContent> 
                    <Link href={"/login"}>Login to Leave a Review</Link>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default loginCard;
