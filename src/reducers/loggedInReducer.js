import { SET_LOGGEDIN } from '../actions/actions';

const initState = false;

const loggedInReducer = (state = initState, { type, payload }) => {
  switch (type) {
    case SET_LOGGEDIN:
      return payload;
    default:
      return state;
  }
};

export default loggedInReducer;
