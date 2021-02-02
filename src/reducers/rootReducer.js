import { combineReducers } from 'redux';
import setUserReducer from './setUserReducer';

const rootReducer = combineReducers({
  userData: setUserReducer,
});

export default rootReducer;
