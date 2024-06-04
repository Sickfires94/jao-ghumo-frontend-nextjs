import React, { useState } from 'react';
import { Card, CardContent, Typography, Grid, Button } from '@mui/material';
import { getCookie } from 'typescript-cookie';
import { useRouter } from 'next/navigation';
import { debug } from 'console';

const UserCard = ({ user }: { user: any }) => {
  const [isActivated, setIsActivated] = useState(user.is_active); // Initial state based on user data
  const Router = useRouter();
  const buttonColor = isActivated ? 'error.main' : 'success.main'; // Using MUI color classes

  const handleActivate = async () => {
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
          body: JSON.stringify({ email: user.email }),
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
      setIsActivated(!isActivated); // Update state (optional, doesn't affect refresh)
      console.log('User activated:', user.email, data.isActive); // Log the activation status (optional
      Router.refresh(); // Refresh the page after successful update
    } catch (error) {
      console.error('Error activating user:', error);
      // Handle errors appropriately (e.g., display error message)
    }
  };

  return (
    <Grid item xs={12} sm={6} md={4} lg={3}>
      <Card>
        <CardContent>
          <Typography variant="h6" component="div">
            {user.firstname} {user.lastname}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Email: {user.email}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Role: {user.role}
          </Typography>
          {user.reviews && (
            <Typography variant="body2" color="text.secondary">
              Reviews: {user.reviews.length}
            </Typography>
          )}
          <Typography variant="body2" color="text.secondary">
            Is Activated: {isActivated ? 'True' : 'False'}
          </Typography>
          <Button
            variant="contained"
            onClick={handleActivate}
            sx={{ backgroundColor: buttonColor }} // Set button color based on active status
          >
            {isActivated ? 'Deactivate' : 'Activate'}
          </Button>
        </CardContent>
      </Card>
    </Grid>
  );
};

export default UserCard;
