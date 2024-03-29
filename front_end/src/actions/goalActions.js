// goalActions.js

// Action Types
export const ADD_GOAL = 'ADD_GOAL';
export const REMOVE_GOAL = 'REMOVE_GOAL';
// Add this to your existing action types
export const TOGGLE_GOAL_ACHIEVED = 'TOGGLE_GOAL_ACHIEVED';


// Action Creators

// Add this to your existing action types in goalActions.js
export const FETCH_GOALS_SUCCESS = 'FETCH_GOALS_SUCCESS';

// Add this asynchronous action creator to goalActions.js
export const fetchGoals = () => async (dispatch) => {
    try {
        const response = await fetch('/api/goals-dreams/');
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
export const updateHoursSpent = (id, hoursSpent) => ({
    type: UPDATE_HOURS_SPENT,
    payload: { id, hoursSpent },
});

// Add a Goal
export const addGoal = (goal) => ({
    type: ADD_GOAL,
    payload: goal,
});

// Remove a Goal by id
export const removeGoal = (id) => ({
    type: REMOVE_GOAL,
    payload: id,
});


// Add this function to goalActions.js
export const toggleGoalAchieved = (id) => ({
    type: TOGGLE_GOAL_ACHIEVED,
    payload: id,
});
