// goalActions.js
import store from '../store';
import axios from 'axios';
// Action Types
export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';
// Add this to your existing action types
export const TOGGLE_GOAL_ACHIEVED = 'TOGGLE_GOAL_ACHIEVED';
// Add to your existing action types
export const CREATE_GOAL_SUCCESS = 'CREATE_GOAL_SUCCESS';
export const CREATE_GOAL_FAILURE = 'CREATE_GOAL_FAILURE';

export const UPDATE_GOAL_SUCCESS = 'UPDATE_GOAL_SUCCESS';
export const UPDATE_GOAL_FAILURE = 'UPDATE_GOAL_FAILURE';

// Action Creators

// Add this to your existing action types in goalActions.js
export const FETCH_GOALS_SUCCESS = 'FETCH_GOALS_SUCCESS';

// Add this asynchronous action creator to goalActions.js
export const fetchGoals = () => async (dispatch) => {
    try {
        //fetch access token from redux store
        const accessToken = store.getState().auth.accessToken;
        // Setup headers with Authorization
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}` // Include the token here
            }
        };
        const response = await fetch('/api/goals-dreams/', config);
        if (!response.ok) {
            // Log or handle HTTP errors (e.g., response status is not 2xx)
            console.error('Network response was not ok:', response.statusText);
            return;
        }
        const goals = await response.json();
        dispatch({
            type: FETCH_GOALS_SUCCESS,
            payload: goals,
        });
    } catch (error) {
        // Catch and log or handle fetch errors (e.g., network error)
        console.error('Failed to fetch goals:', error);
    }
};

export const UPDATE_HOURS_SPENT = 'UPDATE_HOURS_SPENT';

// Action creator for updating hours spent on a goal
export const updateHoursSpent = (goal_id, hours_spent) => ({
    type: UPDATE_HOURS_SPENT,
    payload: { goal_id, hours_spent },
});

// New asynchronous action creator for creating a goal
export const createGoalDream = (goalData) => async (dispatch) => {
    try {
        // Fetch access token from Redux store
        const accessToken = store.getState().auth.accessToken;
        // Setup headers with Authorization
        const response = await axios.post('/api/goals-dreams/', goalData, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${accessToken}` // Include the token here
            }
        });

        const action = {
            type: CREATE_GOAL_SUCCESS,
            payload: response.data, // Assuming the server responds with the created goal
        };
        dispatch({
            type: CREATE_GOAL_SUCCESS,
            payload: response.data, // Assuming the server responds with the created goal
        });
        dispatch(fetchGoals());
        return action;
        // Optionally, you can dispatch fetchGoals to refresh the list of goals
    } catch (error) {
        console.error('Failed to create goal:', error.response ? error.response.data : error);
        dispatch({
            type: CREATE_GOAL_FAILURE,
            // You can pass error information to the reducer if you want to handle that in your UI
            payload: error.response ? error.response.data : error,
        });
    }
};


// Asynchronous action creator for updating a goal
export const updateGoal = (goalData) => async (dispatch) => {
    try {
        // Fetch access token from Redux store
        const accessToken = store.getState().auth.accessToken;

        // Prepare headers and body for the PUT request
        const headers = new Headers({
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        });

        const response = await fetch('/api/goals-dreams/', {
            method: 'PUT',
            headers: headers,
            body: JSON.stringify(goalData) // Send the updated goal data
        });

        if (!response.ok) {
            throw new Error(`HTTP status ${response.status}`);
        }

        const data = await response.json(); // Parsing the response data

        dispatch({
            type: UPDATE_GOAL_SUCCESS,
            payload: data // Assuming the server responds with the updated goal
        });

        // Optionally, you can dispatch fetchGoals to refresh the list of goals
        dispatch(fetchGoals());
    } catch (error) {
        console.error('Failed to update goal:', error.message);
        dispatch({
            type: UPDATE_GOAL_FAILURE,
            payload: error.message, // Send error message to the reducer
        });
    }
};

// Add a Goal
export const addGoal = (goal) => ({
    type: ADD_GOAL,
    payload: goal,
});

// Remove a Goal by id
export const removeGoal = (goal_id) => ({
    type: REMOVE_GOAL,
    payload: goal_id,
});


// Add this function to goalActions.js
export const toggleGoalAchieved = (goal_id) => ({
    type: TOGGLE_GOAL_ACHIEVED,
    payload: goal_id,
});
