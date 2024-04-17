import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { updateGoal } from '../../actions/goalActions';
import { Dialog, DialogTitle, DialogContent, TextField, Button, DialogActions } from '@mui/material';

const GoalDetailsModal = ({ open, handleClose, goal }) => {
    const [editedGoal, setEditedGoal] = useState(goal);
    const dispatch = useDispatch();

    const handleChange = (e) => {
        setEditedGoal({ ...editedGoal, [e.target.name]: e.target.value });
    };

    const handleSave = () => {
        dispatch(updateGoal(editedGoal)); // Assuming you have an action to update goals
        handleClose(); // Close modal after save
    };

    return (
        <Dialog open={open} onClose={handleClose} fullWidth maxWidth="sm">
            <DialogTitle>Edit Goal</DialogTitle>
            <DialogContent>
                <TextField
                    margin="dense"
                    label="Goal Title"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="goaltitle"
                    value={editedGoal.goaltitle}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Description"
                    type="text"
                    fullWidth
                    multiline
                    rows={4}
                    variant="outlined"
                    name="description"
                    value={editedGoal.description}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Hours Spent"
                    type="number"
                    fullWidth
                    variant="outlined"
                    name="hours_spent"
                    value={editedGoal.hours_spent}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Hours Required"
                    type="number"
                    fullWidth
                    variant="outlined"
                    name="hours_required"
                    value={editedGoal.hours_required}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Connected Emails"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="connected_emails"
                    value={editedGoal.connected_emails}
                    onChange={handleChange}
                />
                <TextField
                    margin="dense"
                    label="Incentive"
                    type="text"
                    fullWidth
                    variant="outlined"
                    name="incentive"
                    value={editedGoal.incentive}
                    onChange={handleChange}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose} color="primary">
                    Cancel
                </Button>
                <Button onClick={handleSave} color="primary">
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default GoalDetailsModal;
