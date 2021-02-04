import React from 'react';
import PropTypes from 'prop-types';
import classes from './ErrorIndicator.module.scss';

const ErrorIndicator = ({ errorMessage }) => (
  <p style={{ color: '#f5222d' }} className={classes.Error}>
    {errorMessage}
  </p>
);

export default ErrorIndicator;

ErrorIndicator.defaultProps = {
  errorMessage: '',
};

ErrorIndicator.propTypes = {
  errorMessage: PropTypes.string,
};
