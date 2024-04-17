import { FETCH_USER_PREFERENCES_SUCCESS, UPDATE_USER_PREFERENCES_SUCCESS, UPDATE_USER_PREFERENCES_FAIL, FETCH_USER_PREFERENCES_FAIL } from "../actions/preferencesActions";

const initialState = {
    preferences: null,
    error: false
};

const userPreferencesReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_PREFERENCES_SUCCESS:
            return {
                ...state,
                preferences: action.payload,
                error: false
            };
        case UPDATE_USER_PREFERENCES_SUCCESS:
            return {
                ...state,
                preferences: action.payload,
                error: false
            };
        case FETCH_USER_PREFERENCES_FAIL:
        case UPDATE_USER_PREFERENCES_FAIL:
            return {
                ...state,
                error: true
            };
        default:
            return state;
    }
};

export default userPreferencesReducer;
