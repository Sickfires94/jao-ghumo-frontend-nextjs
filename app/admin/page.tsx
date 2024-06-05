'use client';

import React, { useEffect, useState } from 'react';
import { Container, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper, Button } from '@mui/material';
import ButtonAppBar from '../components/Navbar';
import axios from 'axios';
import { getCookie } from 'typescript-cookie';

interface User {
  email: string;
  firstname: string;
  lastname: string;
  role: string;
  reviews?: number;
  is_active: boolean;
}

const AdminDashboard: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

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

  const handleActivate = async (email: string, isActivated: boolean) => {
    try {
      const token = getCookie('token');
      const response = await fetch(
        isActivated ? 'http://localhost:3000/users/deactivate' : 'http://localhost:3000/users/activate',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ email }),
        }
      );

      if (!response.ok) {
        if (response.status === 401) {
          throw new Error('Unauthorized access. Please check your token');
        } else {
          throw new Error(`Network response was not ok. Status: ${response.status}`);
        }
      }

      const data = await response.json();
      console.log('API response:', data);
      setUsers(users.map(user => user.email === email ? { ...user, is_active: !isActivated } : user));
    } catch (error) {
      console.error('Error activating user:', error);
    }
  };

  return (
    <>
      <ButtonAppBar />
      <Container>
        <Typography variant="h4" component="div" gutterBottom>
          Admin Dashboard
        </Typography>
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>First Name</TableCell>
                <TableCell>Last Name</TableCell>
                <TableCell>Email</TableCell>
                <TableCell>Role</TableCell>
                <TableCell>Reviews</TableCell>
                <TableCell>Is Activated</TableCell>
                <TableCell>Actions</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.email}>
                  <TableCell>{user.firstname}</TableCell>
                  <TableCell>{user.lastname}</TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>{user.role}</TableCell>
                  <TableCell>{user.reviews ? user.reviews : 'N/A'}</TableCell>
                  <TableCell>{user.is_active ? 'True' : 'False'}</TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      onClick={() => handleActivate(user.email, user.is_active)}
                      sx={{ backgroundColor: user.is_active ? 'error.main' : 'success.main' }}
                    >
                      {user.is_active ? 'Deactivate' : 'Activate'}
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Container>
    </>
  );
};

export default AdminDashboard;
