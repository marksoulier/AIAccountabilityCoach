import React from 'react';
import Navigator from '../Navigator/Navigator';
import ActivityTracker from '../ActivityTracker/ActivityTracker';
import GoalTracker from '../GoalTracker/GoalTracker';

const Dashboard = () => {
    return (
        <div>
            <Navigator />
            <h1>Dashboard</h1>
            <GoalTracker />
            <ActivityTracker />
        </div>
    );
};

export default Dashboard;