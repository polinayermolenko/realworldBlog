import { combineReducers } from 'redux';
import loggedInReducer from './loggedInReducer';
import setUserReducer from './setUserReducer';

const rootReducer = combineReducers({
  userData: setUserReducer,
  loggedIn: loggedInReducer,
});

export default rootReducer;
