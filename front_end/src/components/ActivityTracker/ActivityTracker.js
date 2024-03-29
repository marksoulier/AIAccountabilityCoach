import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addActivity, removeActivity } from '../../actions/activityActions';

function ActivityTracker() {
    const [activityName, setActivityName] = useState('');
    const [timeSpent, setTimeSpent] = useState('');
    const activities = useSelector(state => state.activity.activities);
    const dispatch = useDispatch();

    const handleAddActivity = () => {
        dispatch(addActivity({ id: Math.random().toString(), name: activityName, time: timeSpent }));
        setActivityName('');
        setTimeSpent('');
    };

    const handleRemoveActivity = (id) => {
        dispatch(removeActivity(id));
    };

    return (
        <div className="activity-tracker">
            <h2>Activity Tracker</h2>
            <div>
                <input
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value)}
                    placeholder="Activity name"
                />
                <input
                    type="number"
                    value={timeSpent}
                    onChange={(e) => setTimeSpent(e.target.value)}
                    placeholder="Time spent (hours)"
                />
                <button onClick={handleAddActivity}>Add Activity</button>
            </div>
            <ul>
                {activities.map(activity => (
                    <li key={activity.id}>
                        {activity.name} - {activity.time} hours
                        <button onClick={() => handleRemoveActivity(activity.id)}>Remove</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default ActivityTracker;
