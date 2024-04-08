// src/components/GoalGrid.js
import React from 'react';
import { useSelector } from 'react-redux';
import Grid from '@mui/material/Grid';
import GoalCard from '../GoalCard/GoalCard'; // Ensure this path matches your file structure

const GoalGrid = () => {
    const goals = useSelector(state => state.goal.goals);

    console.log(goals);

    return (
        <Grid container spacing={4}>
            {goals.map((goal) => (
                <Grid item key={goal.id} xs={12} sm={6} md={4}>
                    <GoalCard {...goal} />
                </Grid>
            ))}
        </Grid>
    );
};

export default GoalGrid;
