// src/components/Navbar/Navbar.js
import React, { useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { getCookie } from '../../utils/cookieUtils'; // Implement getCookie or use a package to get the value
import { Link } from 'react-router-dom';
import BasicModal from '../Modal/Modal';
import FormPage from '../GoalCreator/FormPage';
import Profile from '../Profile/Profile';

const Navbar = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState('');
  const [modalContent, setModalContent] = useState('');

  const handleOpenModal = (title, Content) => {
    setModalTitle(title);
    setModalContent(Content);
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

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
          <Button color="inherit" onClick={() => handleOpenModal('Submit New Goal', <FormPage />)}>
            Form
          </Button>
          <Button color="inherit" onClick={() => handleOpenModal('Invite Friend', 'Send an invite link to your friend.')}>
            Invite Friend
          </Button>
          <Button color="inherit" onClick={() => handleOpenModal('Account', <Profile />)}>
            Account
          </Button>
          <Button color="inherit" onClick={handleLogout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <BasicModal open={modalOpen} onClose={handleCloseModal} title={modalTitle}>
        <Typography>
          {modalContent}
        </Typography>
      </BasicModal>
    </Box>
  );
};

export default Navbar;
