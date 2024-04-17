import { FETCH_USER_PROFILE_SUCCESS, UPDATE_USER_PROFILE_SUCCESS } from '../actions/profileActions';

const initialState = {
    profile: null, // This will store the user's profile data
};

const userProfileReducer = (state = initialState, action) => {
    switch (action.type) {
        case FETCH_USER_PROFILE_SUCCESS:
            return {
                ...state,
                profile: action.payload, // Set profile data fetched from the API
            };
        case UPDATE_USER_PROFILE_SUCCESS:
            return {
                ...state,
                profile: {
                    ...state.profile,
                    ...action.payload, // Merge updated profile data into existing profile
                },
            };

        default:
            return state;
    }
};

export default userProfileReducer;