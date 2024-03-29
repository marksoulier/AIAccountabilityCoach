import { ADD_GOAL, REMOVE_GOAL, TOGGLE_GOAL_ACHIEVED, FETCH_GOALS_SUCCESS, UPDATE_HOURS_SPENT } from '../actions/goalActions';

const initialState = {
    goals: [],
};

const goalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GOAL:
            return {
                ...state,
                goals: [...state.goals, action.payload],
            };
        case REMOVE_GOAL:
            return {
                ...state,
                goals: state.goals.filter(goal => goal.id !== action.payload),
            };
        case TOGGLE_GOAL_ACHIEVED:
            return {
                ...state,
                goals: state.goals.map(goal =>
                    goal.id === action.payload ? { ...goal, achieved: !goal.achieved } : goal
                ),
            };
        case FETCH_GOALS_SUCCESS:
            return {
                ...state,
                goals: action.payload, // Assuming the payload is an array of goals
            };
        case UPDATE_HOURS_SPENT:
            return {
                ...state,
                goals: state.goals.map(goal =>
                    goal.id === action.payload.id ? { ...goal, hours_spent: action.payload.hoursSpent } : goal
                ),
            };

        default:
            return state;
    }
};

export default goalReducer;
