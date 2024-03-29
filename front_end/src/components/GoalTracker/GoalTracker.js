import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addGoal, toggleGoalAchieved, fetchGoals } from '../../actions/goalActions';
import './GoalTracker.css';

function GoalTracker() {
    const [newGoalText, setNewGoalText] = useState('');
    const [hoursRequired, setHoursRequired] = useState('');
    const goals = useSelector(state => state.goal.goals);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(fetchGoals());
    }, [dispatch]);

    const handleAddGoal = () => {
        if (!newGoalText.trim()) return;
        dispatch(addGoal({
            id: Math.random().toString(),
            goal: newGoalText,
            achieved: false,
            hours_spent: 0,
            hours_required: parseFloat(hoursRequired) || 0,
            date_time: new Date().toISOString()
        }));
        setNewGoalText('');
        setHoursRequired('');
    };

    const handleAchieveGoal = (id) => {
        dispatch(toggleGoalAchieved(id));
    };

    return (
        <div className="goal-tracker">
            <h2>Goal Tracker</h2>
            <ul>
                {goals.map((goal) => (
                    <li key={goal.id} className={`goal ${goal.achieved ? 'achieved' : ''}`}>
                        Goal: {goal.goal}<br />
                        Hours Spent: {goal.hours_spent}<br />
                        Hours Required: {goal.hours_required}<br />
                        Date: {new Date(goal.date_time).toLocaleDateString()}<br />
                        <button onClick={() => handleAchieveGoal(goal.id)} className="achieve-button">
                            {goal.achieved ? 'Undo' : 'Complete'}
                        </button>
                    </li>
                ))}
            </ul>
            <div className="goal-input">
                <input
                    type="text"
                    placeholder="Add a new goal"
                    value={newGoalText}
                    onChange={(e) => setNewGoalText(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Hours Required"
                    value={hoursRequired}
                    onChange={(e) => setHoursRequired(e.target.value)}
                />
                <button onClick={handleAddGoal}>Add Goal</button>
            </div>
        </div>
    );
}

export default GoalTracker;
