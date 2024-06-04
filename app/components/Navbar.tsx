"use client"

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../img/logo2.png';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../redux/store';
import { logout } from '../redux/authSlice';
import { clearUser } from '../redux/userSlice';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';

export default function ButtonAppBar() {
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const user = useSelector((state: RootState) => state.user.user);
    const dispatch = useDispatch();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleLogout = () => {
        dispatch(logout());
        dispatch(clearUser());
        window.location.reload(); // Refresh the page
    };

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Box display="flex" alignItems="center" sx={{ mr: 2 }}>
                        <Link href="/">
                            <Image src={logo} alt='/' width={50} height={100} style={{ marginRight: "10px" }} />
                        </Link>
                        <Link href="/">
                            <Typography variant="h6" component="div">
                                <strong>JAOGHUMO</strong>
                            </Typography>
                        </Link>
                    </Box>

                    <Box sx={{ flexGrow: 1 }} justifyContent="center" display="flex">
                        {['Airports', 'Trips', 'Review'].map((text) => (
                            <Typography
                                key={text}
                                component="a"
                                href="#"
                                variant="h6"
                                sx={{
                                    mx: 3,
                                    padding: '8px 16px',
                                    borderRadius: '4px',
                                    transition: 'box-shadow 0.3s ease-in-out',
                                    '&:hover': {
                                        boxShadow: '0px 4px 8px rgba(0, 0, 0, 0.2)',
                                        backgroundColor: 'rgba(255, 255, 255, 0.1)', // Light background color on hover
                                    },
                                    textDecoration: 'none',
                                    color: 'inherit',
                                }}
                            >
                                {text}
                            </Typography>
                        ))}
                    </Box>

                    {!isAuthenticated ? (
                        <>
                            <Link href="/signup" passHref style={{ marginRight: "5px" }}>
                                <Button color="inherit">SignUp</Button>
                            </Link>
                            <Link href="/login" passHref>
                                <Button color="inherit">Login</Button>
                            </Link>
                        </>
                    ) : (
                        <div>
                            <IconButton
                                size="large"
                                edge="end"
                                color="inherit"
                                onClick={handleMenu}
                            >
                                <AccountCircle />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorEl}
                                anchorOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'right',
                                }}
                                open={Boolean(anchorEl)}
                                onClose={handleClose}
                            >
                                <MenuItem>{`${user?.firstname} ${user?.lastname}`}</MenuItem>
                                <MenuItem>{user?.role}</MenuItem>
                                <MenuItem onClick={handleLogout}>Logout</MenuItem>
                            </Menu>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
