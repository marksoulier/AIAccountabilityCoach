// Action Types
export const ADD_ACTIVITY = 'ADD_ACTIVITY';
export const REMOVE_ACTIVITY = 'REMOVE_ACTIVITY';

// Action Creators
export const addActivity = (activity) => ({
    type: ADD_ACTIVITY,
    payload: activity,
});

export const removeActivity = (id) => ({
    type: REMOVE_ACTIVITY,
    payload: id,
});

