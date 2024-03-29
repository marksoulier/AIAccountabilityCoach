import { ADD_ACTIVITY, REMOVE_ACTIVITY } from '../actions/activityActions';

const initialState = {
    activities: [],
};

function activityReducer(state = initialState, action) {
    switch (action.type) {
        case ADD_ACTIVITY:
            return {
                ...state,
                activities: [...state.activities, action.payload],
            };
        case REMOVE_ACTIVITY:
            return {
                ...state,
                activities: state.activities.filter(activity => activity.id !== action.payload),
            };
        default:
            return state;
    }
}

export default activityReducer;
