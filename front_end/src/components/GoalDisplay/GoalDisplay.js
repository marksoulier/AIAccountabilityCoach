import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal, toggleGoalAchieved } from '../../actions/goalActions';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Chip from '@mui/material/Chip';
import { green, red } from '@mui/material/colors';
import Box from '@mui/material/Box';
import CardActions from '@mui/material/CardActions';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

function GoalDisplay() {
    const [newGoalTitle, setNewGoalTitle] = useState('');
    const [newGoalDescription, setNewGoalDescription] = useState('');
    const [hoursRequired, setHoursRequired] = useState('');
    const [connectedEmails, setConnectedEmails] = useState('');
    const [incentive, setIncentive] = useState('');
    const goals = useSelector(state => state.goal.goals);
    const dispatch = useDispatch();

    const handleAddGoal = () => {
        if (!newGoalTitle.trim()) return;
        dispatch(addGoal({
            id: Math.random().toString(),
            goaltitle: newGoalTitle,
            description: newGoalDescription,
            achieved: false,
            hours_spent: 0,
            hours_required: parseFloat(hoursRequired) || 0,
            date_time: new Date().toISOString(),
            connected_emails: connectedEmails,
            incentive: incentive
        }));
        // Reset form fields
        setNewGoalTitle('');
        setNewGoalDescription('');
        setHoursRequired('');
        setConnectedEmails('');
        setIncentive('');
    };

    return (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <TextField
                    label="Goal Title"
                    variant="outlined"
                    size="small"
                    value={newGoalTitle}
                    onChange={(e) => setNewGoalTitle(e.target.value)}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    size="small"
                    value={newGoalDescription}
                    onChange={(e) => setNewGoalDescription(e.target.value)}
                />
                <TextField
                    label="Hours Required"
                    variant="outlined"
                    size="small"
                    value={hoursRequired}
                    onChange={(e) => setHoursRequired(e.target.value)}
                />
                <TextField
                    label="Connected Emails"
                    variant="outlined"
                    size="small"
                    value={connectedEmails}
                    onChange={(e) => setConnectedEmails(e.target.value)}
                />
                <TextField
                    label="Incentive"
                    variant="outlined"
                    size="small"
                    value={incentive}
                    onChange={(e) => setIncentive(e.target.value)}
                />
                <Button variant="contained" color="primary" onClick={handleAddGoal}>Add Goal</Button>
            </Box>
            {goals.map((goal) => (
                <Card key={goal.id} sx={{ minWidth: 275, marginBottom: 2 }}>
                    <CardContent>
                        <Typography variant="h5" component="div">
                            {goal.goaltitle}
                        </Typography>
                        <Typography variant="body2">
                            {goal.description}
                        </Typography>
                        <Chip
                            label={goal.achieved ? 'Completed' : 'Not completed'}
                            size="small"
                            color={goal.achieved ? 'success' : 'error'}
                            style={{
                                backgroundColor: goal.achieved ? green[500] : red[500],
                                color: 'white',
                            }}
                        />
                        <Typography variant="body2" color="text.secondary">
                            Hours Required: {goal.hours_required}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Connected Emails: {goal.connected_emails}
                        </Typography>
                        <Typography variant="body2" color="text.secondary">
                            Incentive: {goal.incentive}
                        </Typography>
                    </CardContent>
                    <CardActions>
                        <Button size="small" onClick={() => toggleGoalAchieved(goal.id)}>Toggle Complete</Button>
                        {/* Implement further actions as needed */}
                    </CardActions>
                </Card>
            ))}
        </Box>
    );
}

export default GoalDisplay;
