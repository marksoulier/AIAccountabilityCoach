import store from '../store';

export const FETCH_USER_PREFERENCES_SUCCESS = 'FETCH_USER_PREFERENCES_SUCCESS';
export const UPDATE_USER_PREFERENCES_SUCCESS = 'UPDATE_USER_PREFERENCES_SUCCESS';
export const FETCH_USER_PREFERENCES_FAIL = 'FETCH_USER_PREFERENCES_FAIL';
export const UPDATE_USER_PREFERENCES_FAIL = 'UPDATE_USER_PREFERENCES_FAIL';

// Function to fetch user preferences
export const fetchUserPreferences = () => async (dispatch) => {
    try {
        const accessToken = store.getState().auth.accessToken;

        const response = await fetch('/api/user/preferences/', {
            headers: {
                'Authorization': `Bearer ${accessToken}`, // Adjust based on how you store your token
                'Content-Type': 'application/json'
            },
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const data = await response.json();
        dispatch({
            type: FETCH_USER_PREFERENCES_SUCCESS,
            payload: data,
        });
    } catch (error) {
        console.error('Failed to fetch user preferences:', error);
        dispatch({
            type: FETCH_USER_PREFERENCES_FAIL
        });
    }
};

// Function to update user preferences
export const updateUserPreferences = (preferences) => async (dispatch) => {
    try {

        const accessToken = store.getState().auth.accessToken;

        const response = await fetch('/api/user/preferences/', {
            method: 'PUT',
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(preferences)
        });

        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const updatedData = await response.json();
        dispatch({
            type: UPDATE_USER_PREFERENCES_SUCCESS,
            payload: updatedData,
        });
    } catch (error) {
        console.error('Failed to update user preferences:', error);
        dispatch({
            type: UPDATE_USER_PREFERENCES_FAIL
        });
    }
};
