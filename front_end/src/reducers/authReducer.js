// authReducer.js
import { SET_AUTH_TOKENS } from '../actions/authActions';

const initialState = {
    accessToken: null,
    refreshToken: null,
};

const authReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_AUTH_TOKENS:
            return {
                ...state,
                accessToken: action.payload.access,
                refreshToken: action.payload.refresh,
            };
        default:
            return state;
    }
};

export default authReducer;
