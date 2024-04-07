import React from 'react';
import Navigator from '../Navigator/Navigator';
import ActivityTracker from '../ActivityTracker/ActivityTracker';
import GoalTracker from '../GoalTracker/GoalTracker';
import ChatWithOpenAI from '../ChatGPT/ChatWithOpenAI';
import GoalForm
    from '../GoalForm/GoalForm';
import FormPage from '../GoalCreator/FormPage';

const Dashboard = () => {
    return (
        <div>
            {/* <FormPage /> */}
            <Navigator />
            <h1>Dashboard</h1>
            <GoalTracker />
            <ActivityTracker />
            <ChatWithOpenAI />
            <GoalForm />
        </div>
    );
};

export default Dashboard;