import { combineReducers } from 'redux';
import activityReducer from './reducers/activityReducer';
import goalReducer from './reducers/goalReducer';
import authReducer from './reducers/authReducer';
import userProfileReducer from './reducers/profileReducer';
import userPreferencesReducer from './reducers/preferencesReducer';

const rootReducer = combineReducers({
    activity: activityReducer,
    goal: goalReducer,
    auth: authReducer,
    profile: userProfileReducer,
    preferences: userPreferencesReducer,
    // Add more reducers as you create them
});

export default rootReducer;