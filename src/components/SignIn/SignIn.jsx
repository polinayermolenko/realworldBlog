import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, Redirect } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'antd';
import isEmail from 'validator/es/lib/isEmail';
import FormInput from '../FormInput/FormInput';
import ArticlesService from '../../services/ArticlesService';
import { setLoggedIn, setUser } from '../../actions/actions';
import classes from './SignIn.module.scss';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';

const SignIn = () => {
  const dispatch = useDispatch();
  const auth = useSelector(({ loggedIn = false }) => loggedIn);

  const [serverErrors, setServerErrors] = useState({
    'email or password': null,
  });

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
        dispatch(setLoggedIn(true));
        localStorage.setItem('token', body.user.token);
        dispatch(setUser(body.user));
      })
      .catch((err) => console.log(err));
  };

  if (auth) {
    return <Redirect to="/" />;
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

export default SignIn;
