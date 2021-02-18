export const SET_USER = 'SET_USER';
export const SET_LOGGEDIN = 'SET_LOGGEDIN';
export const setUser = (payload) => ({ type: SET_USER, user: payload });
export const setLoggedIn = (payload) => ({ type: SET_LOGGEDIN, payload });
