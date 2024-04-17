import React, { useState } from 'react';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions, Typography } from '@mui/material';

const Friends = ({ handleSubmit }) => {
    const [emails, setEmails] = useState('');  // Initialize directly with empty string
    const [incentive, setIncentive] = useState('');  // Initialize directly with empty string

    const handleEmailChange = (event) => {
        setEmails(event.target.value);
    };

    const handleIncentiveChange = (event) => {
        setIncentive(event.target.value);
    };

    const handleSave = () => {
        handleSubmit(emails, incentive);
    };

    return (
        <Dialog open={true} onClose={() => { }}>
            <Typography variant="h6" gutterBottom>
                Congratulations, goal has been created
            </Typography>
            <DialogTitle>Invite Friends & Set Incentive</DialogTitle>
            <DialogContent>
                <TextField
                    autoFocus
                    margin="dense"
                    label="Connected Emails"
                    type="email"
                    fullWidth
                    variant="outlined"
                    value={emails}
                    onChange={handleEmailChange}
                />
                <TextField
                    margin="dense"
                    label="Incentive"
                    type="text"
                    fullWidth
                    variant="outlined"
                    value={incentive}
                    onChange={handleIncentiveChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleSave}>Save</Button>
            </DialogActions>
        </Dialog>
    );
};

export default Friends;
