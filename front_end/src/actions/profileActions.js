import store from '../store';
import axios from 'axios';

export const FETCH_USER_PROFILE_SUCCESS = 'FETCH_USER_PROFILE_SUCCESS';
export const UPDATE_USER_PROFILE_SUCCESS = 'UPDATE_USER_PROFILE_SUCCESS';

// Add this asynchronous action creator to userActions.js
export const fetchUserProfile = () => async (dispatch) => {
    try {
        // Fetch access token from redux store
        const accessToken = store.getState().auth.accessToken;
        // Setup headers with Authorization
        const config = {
            headers: {
                'Authorization': `Bearer ${accessToken}` // Include the token here
            }
        };
        const response = await fetch('/api/user/profile', config);
        if (!response.ok) {
            // Log or handle HTTP errors (e.g., response status is not 2xx)
            console.error('Network response was not ok:', response.statusText);
            return;
        }
        const userProfile = await response.json();
        dispatch({
            type: 'FETCH_USER_PROFILE_SUCCESS',
            payload: userProfile,
        });
    } catch (error) {
        // Catch and log or handle fetch errors (e.g., network error)
        console.error('Failed to fetch user profile:', error);
    }
};

// Add this asynchronous action creator to userActions.js for updating user profile
export const updateUserProfile = (userData) => async (dispatch) => {
    try {
        // Fetch access token from redux store
        const accessToken = store.getState().auth.accessToken;
        // Setup headers with Authorization and content type
        const config = {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(userData)
        };
        const response = await fetch('/api/user/profile/', config);
        if (!response.ok) {
            // Log or handle HTTP errors (e.g., response status is not 2xx)
            console.error('Network response was not ok:', response.statusText);
            return;
        }
        const updatedProfile = await response.json();
        dispatch({
            type: 'UPDATE_USER_PROFILE_SUCCESS',
            payload: updatedProfile,
        });
    } catch (error) {
        // Catch and log or handle fetch errors (e.g., network error)
        console.error('Failed to update user profile:', error);
    }
};
