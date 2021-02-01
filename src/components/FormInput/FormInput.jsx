import React from 'react';
import PropTypes from 'prop-types';
import classes from './FormInput.module.scss';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';

const FormInput = React.forwardRef((props, ref) => {
  const { id, label, error, ...inputProps } = props;
  return (
    <div className={classes.FormInput}>
      <label htmlFor={id}>{label}</label>
      <input className={classes.FormInput__Input} id={id} placeholder={label} ref={ref} {...inputProps} />
      {error && <ErrorIndicator errorMessage={error.message} />}
    </div>
  );
});

export default FormInput;

FormInput.defaultProps = {
  error: {},
};

FormInput.propTypes = {
  label: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  error: PropTypes.instanceOf(Object),
};
