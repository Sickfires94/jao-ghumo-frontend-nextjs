import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../img/logo.png';

export default function ButtonAppBar() {
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    
                    <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
                        <Image src={logo} alt='/' width={50} height={100} style={{ marginRight: "10px" }} />
                        <Typography variant="h6" component="div">
                            <strong>JAOGHUMO</strong>
                        </Typography>
                    </Box>

                    
                    <Box sx={{ flexGrow: 1 }} justifyContent="center" display="flex">
                        <Typography component="a" href="#" variant="h6"  sx={{ mx: 3 }}>
                            Airports
                        </Typography>
                        <Typography component="a" href="#" variant="h6"  sx={{ mx: 3 }}>
                            Trips
                        </Typography>
                        <Typography component="a" href="#" variant="h6"  sx={{ mx: 3 }}>
                            Review
                        </Typography>
                    </Box>

                    
                    <Link href="/login" passHref>
                        <Button color="inherit">Login</Button>
                    </Link>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
