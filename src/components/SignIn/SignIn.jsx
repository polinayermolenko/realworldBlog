import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import FormInput from '../FormInput/FormInput';
import { setLoggedIn, setUser } from '../../actions/actions';
import ArticlesService from '../../services/ArticlesService';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import useValidation from '../../hooks/useValidation';
import useBaseHooks from '../../hooks/useBaseHooks';
import classes from './SignIn.module.scss';

const SignIn = () => {
  const articlesService = new ArticlesService();
  const { dispatch, auth } = useBaseHooks();
  const {
    handleSubmit,
    errors,
    emailSettingsValidation,
    passwordSettingsValidation,
    serverErrors,
    setServerErrors,
  } = useValidation();

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
