import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import { Link, useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { Button } from 'antd';
import isEmail from 'validator/es/lib/isEmail';
import FormInput from '../FormInput/FormInput';
import ArticlesService from '../../services/ArticlesService';
import { setUser } from '../../actions/actions';
import classes from './SignIn.module.scss';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';

const SignIn = (props) => {
  const [serverErrors, setServerErrors] = useState({
    'email or password': null,
  });
  const history = useHistory();
  const articlesService = new ArticlesService();
  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'onChange',
  });

  const onSubmit = ({ email, password }) => {
    const requestBody = {
      user: {
        email,
        password,
      },
    };
    articlesService
      .logInUser(requestBody)
      .then((body) => {
        if (body.errors) {
          setServerErrors(body.errors);
          return;
        }
        localStorage.setItem('token', body.user.token);
        props.setUser(body.user);
      })
      .catch((err) => console.log(err));
  };

  if (localStorage.getItem('token')) {
    history.push('/');
  }

  const emailSettingsValidation = register({
    required: 'Email is required',
    validate: () => isEmail(watch('email')) || 'Invalid email format',
  });

  const passwordSettingsValidation = register({
    required: 'Password is required',
    minLength: { value: 8, message: 'Your password needs to be at least 8 characters.' },
    maxLength: { value: 40, message: 'Your password needs to be no more than 40 characters long.' },
  });

  return (
    <div className={classes.SignIn}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.SignIn__Title}>Sign In</h1>
        <FormInput
          ref={emailSettingsValidation}
          id="email"
          error={errors.email}
          label="Email Address"
          type="email"
          name="email"
          serverErrors={serverErrors}
        />

        <FormInput
          ref={passwordSettingsValidation}
          id="password"
          error={errors.password}
          label="Password"
          type="password"
          name="password"
          serverErrors={serverErrors}
        />
        {serverErrors['email or password'] && (
          <ErrorIndicator errorMessage={`Email or password ${serverErrors['email or password']}`} />
        )}
        <Button className={classes.SignIn__Submit} type="primary" htmlType="submit">
          Login
        </Button>
      </form>

      <p className={classes.SignIn__Question}>
        Don&apos;t you have an account? <Link to="/sign-up">Sign Up.</Link>
      </p>
    </div>
  );
};

const mapStateToProps = ({ userData: { user } }) => ({ user });
const mapDispatchToProps = { setUser };

export default connect(mapStateToProps, mapDispatchToProps)(SignIn);

SignIn.propTypes = {
  setUser: PropTypes.func.isRequired,
};
