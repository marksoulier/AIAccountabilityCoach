import { combineReducers } from 'redux';
import activityReducer from './reducers/activityReducer';
import goalReducer from './reducers/goalReducer';

const rootReducer = combineReducers({
    activity: activityReducer,
    goal: goalReducer,
    // Add more reducers as you create them
});

export default rootReducer;