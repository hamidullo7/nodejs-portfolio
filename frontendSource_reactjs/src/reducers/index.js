import { combineReducers } from 'redux';
import tokenReducer from "./tokenReducer";
import loggedReducer from "./loggedReducer";

const allReducers = combineReducers({
    token: tokenReducer,
    logged: loggedReducer
});

export default allReducers;