"use client";

import React, { useEffect, useState } from 'react';
import { Container, Typography, Grid } from '@mui/material';
import ButtonAppBar from '../components/Navbar';
import axios from 'axios';
import { getCookie } from 'typescript-cookie';
import UserCard from '../cards/user';

const admin: React.FC = () => {
  const [users, setUsers] = useState<any[]>([]);

  const fetchProfileData = async () => {
    try {
      const token = getCookie('token');
      const response = await axios.post('http://localhost:3000/users/all', {}, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      setUsers(response.data);
    } catch (error) {
      console.error('Error fetching profile data:', error);
    }
  };

  useEffect(() => {
    fetchProfileData();
  }, []);

  return (
    <>
      <ButtonAppBar />
      <Container>
        <Typography variant="h4" component="div" gutterBottom>
          Admin Dashboard
        </Typography>
        <Typography variant="body1" gutterBottom>
          {/* Add any additional user information here */}
        </Typography>

        {/* Replace individual card mappings with UserCard */}
        {users.map((user, index) => (
          <UserCard key={index} user={user} />
        ))}
      </Container>
    </>
  );
};

export default admin;
