// authActions.js

// Action type
export const SET_AUTH_TOKENS = 'SET_AUTH_TOKENS';

// Action creator
export const setAuthTokens = (access, refresh) => ({
    type: SET_AUTH_TOKENS,
    payload: { access, refresh },
});
