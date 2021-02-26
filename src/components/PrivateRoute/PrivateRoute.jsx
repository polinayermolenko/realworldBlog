import React from 'react';
import { Route, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { getFromLStorage } from '../../utils/localStorage';

const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => (getFromLStorage('token') ? <Component {...props} /> : <Redirect to="/sign-in" />)}
  />
);

export default PrivateRoute;

PrivateRoute.propTypes = {
  component: PropTypes.elementType.isRequired,
};
