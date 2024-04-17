import { ADD_GOAL, REMOVE_GOAL, TOGGLE_GOAL_ACHIEVED, FETCH_GOALS_SUCCESS, UPDATE_HOURS_SPENT, CREATE_GOAL_SUCCESS } from '../actions/goalActions';
import dummyGoals from '../dummydata/dummydata';

const initialState = {
    goals: dummyGoals,
};

const goalReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_GOAL:
        case CREATE_GOAL_SUCCESS:
            return {
                ...state,
                goals: [...state.goals, action.payload],
                currentGoal: action.payload // Store the newly created goal in a separate part of state if needed
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
