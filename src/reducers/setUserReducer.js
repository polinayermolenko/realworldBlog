import { SET_USER } from '../actions/actions';

const initialState = {};

const setUserReducer = (state = initialState, { type, user }) => {
  switch (type) {
    case SET_USER:
      return { ...state, user };

    default:
      return state;
  }
};

export default setUserReducer;
