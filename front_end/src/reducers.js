import { combineReducers } from 'redux';
import activityReducer from './reducers/activityReducer';
import goalReducer from './reducers/goalReducer';
import authReducer from './reducers/authReducer';

const rootReducer = combineReducers({
    activity: activityReducer,
    goal: goalReducer,
    auth: authReducer,
    // Add more reducers as you create them
});

export default rootReducer;