import React from 'react';
import { Button } from '@mui/material';

const Results = ({ goalData, analysisResult, onEditGoal, onCreateGoal }) => {
    return (
        <div>
            <h2>Goal Analysis Results</h2>
            <div>
                {Object.entries(goalData).map(([key, value]) => (
                    // Formatting the label of each goal attribute to make it more readable
                    <p key={key}><strong>{key.charAt(0).toUpperCase() + key.slice(1).replace(/([A-Z])/g, ' $1')}: </strong>{value}</p>
                ))}
                <p><strong>Analysis: </strong>{analysisResult}</p>
            </div>
            <Button onClick={onEditGoal} variant="contained" color="primary" style={{ marginRight: 8 }}>Edit Goal</Button>
            <Button onClick={onCreateGoal} variant="contained" color="primary">Create Goal</Button>
        </div>
    );
};

export default Results;
