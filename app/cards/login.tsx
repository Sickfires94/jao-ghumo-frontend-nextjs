import React from 'react';
import { Card, CardContent, Typography, Grid, ownerDocument, Button } from '@mui/material';
import router from 'next/router';
import Link from 'next/link';


const onSubmit = () => {
    router.push("/login")
}

const loginCard = async () => {
    return (
        <Grid item xs={12} sm={6} md={4} lg={3}>
            <Card>
                <CardContent> 
                    <Link href={"/login"}>Login to Leave a Review</Link>
                </CardContent>
            </Card>
        </Grid>
    );
};

export default loginCard;
