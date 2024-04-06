import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { createGoalDream } from '../../actions/goalActions';

const GoalForm = () => {
    const [goalData, setGoalData] = useState({
        goaltitle: '',
        description: '',
        hours_spent: '',
        hours_required: '',
        date_time: '',
        connected_emails: ''
    });

    const dispatch = useDispatch();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setGoalData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        // Before dispatching, you might need to format data as needed, such as converting hours_spent and hours_required to Decimal
        dispatch(createGoalDream(goalData));
        // Reset form or provide feedback to the user
    };

    return (
        <form onSubmit={handleSubmit}>
            <div>
                <label>Goal Title</label>
                <input type="text" name="goaltitle" value={goalData.goaltitle} onChange={handleChange} required />
            </div>
            <div>
                <label>Description</label>
                <textarea name="description" value={goalData.description} onChange={handleChange} required />
            </div>
            <div>
                <label>Hours Spent</label>
                <input type="number" step="0.01" name="hours_spent" value={goalData.hours_spent} onChange={handleChange} required />
            </div>
            <div>
                <label>Hours Required</label>
                <input type="number" step="0.01" name="hours_required" value={goalData.hours_required} onChange={handleChange} required />
            </div>
            <div>
                <label>Date and Time for Goal</label>
                <input type="datetime-local" name="date_time" value={goalData.date_time} onChange={handleChange} required />
            </div>
            <div>
                <label>Connected Emails</label>
                <input type="text" name="connected_emails" value={goalData.connected_emails} onChange={handleChange} />
            </div>
            <button type="submit">Submit Goal</button>
        </form>
    );
};

export default GoalForm;
