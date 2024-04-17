import React, { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';

const GoalMake = ({ goalData, onChange, onSubmit, isAnalyzing }) => {
    const [goal, setGoal] = useState(goalData);
    const [step, setStep] = useState(1);  // Initialize step state

    // Sync state with external changes
    useEffect(() => {
        setGoal(goalData);
    }, [goalData]);

    const questions = [
        { name: "specific", label: "Specific: What do you want to accomplish?" },
        { name: "measurable", label: "Measurable: How will you measure success?" },
        { name: "achievable", label: "Achievable: Is it achievable? Why?" },
        { name: "relevant", label: "Relevance: Why is this goal important to you?" },
        { name: "timeBound", label: "Time-Bound: When do you want to achieve this goal?" },
    ];

    const handleChange = (e) => {
        const updatedGoal = { ...goal, [e.target.name]: e.target.value };
        setGoal(updatedGoal);
        onChange(updatedGoal); // Notify parent component of the change
    };

    const handleNext = (e) => {
        e.preventDefault();
        if (step < questions.length) {
            setStep(step + 1); // Move to next step
        } else {
            onSubmit(goal);  // Execute final submit function passed from parent
        }
    };

    return (
        <form onSubmit={handleNext}>
            <h2>Create Your SMART Goal</h2>
            {questions.map((question, index) => (
                index + 1 === step ? (
                    // Display current question
                    <TextField
                        key={question.name}
                        label={question.label}
                        variant="outlined"
                        name={question.name}
                        value={goal[question.name]}
                        onChange={handleChange}
                        fullWidth
                        margin="normal"
                        required
                    />
                ) : index < step ? (
                    // Display previous questions and answers
                    <div key={question.name} style={{ marginBottom: '20px' }}>
                        <strong>{question.label}</strong>
                        <p>{goal[question.name]}</p>
                    </div>
                ) : null
            ))}
            <Button type="submit" variant="contained" color="primary" disabled={isAnalyzing}>
                {isAnalyzing ? 'Analyzing...' : (step === questions.length ? 'Submit Goal' : 'Next')}
            </Button>
        </form>
    );
};

export default GoalMake;
