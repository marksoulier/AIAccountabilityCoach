// src/components/Navbar/Navbar.js
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getCookie } from '../../utils/cookieUtils'; // Implement getCookie or use a package to get the value
import { Link } from 'react-router-dom';


const Navbar = () => {

  const handleLogout = async () => {
    const csrfToken = getCookie('csrftoken');
    try {
      const response = await fetch('/accounts/logout/', {
        method: 'POST',
        credentials: 'include',
        headers: {
          'Content-Type': 'application/json',
          'X-CSRFToken': csrfToken,
        },
      });

      if (response.ok) {
        console.log('Logout successful');
        window.location.href = '/'; // Redirect to the home page, causing a full page reload
      } else {
        console.error('Logout failed with status:', response.status);
      }
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            AI Accountability Coach
          </Typography>
          {/* Go to to="/index/form" */}
          <Link to="/index/form">
            <Button color="inherit">Form</Button>
          </Link>
          <Button color="inherit">Invite Friend</Button>
          <Button color="inherit">Account</Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};

export default Navbar;
