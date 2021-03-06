import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import { Button } from 'antd';
import FormInput from '../FormInput/FormInput';
import useFormRegister from '../../hooks/useFormRegister';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import classes from './SignUp.module.scss';
import useSingUp from './useSignUp';

const SignUp = () => {
  const {
    handleSubmit,
    errors,
    serverErrors,
    setServerErrors,
    usernameSettingsValidation,
    emailSettingsValidation,
    passwordSettingsValidation,
    passwordRepeatSettingsValidation,
    agreementSettingsValidation,
  } = useFormRegister();

  const { auth, error, onSubmit } = useSingUp(setServerErrors);

  if (auth) {
    return <Redirect to="/" />;
  }

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div className={classes.SignUp}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.SignUp__Title}>Create new account</h1>

        <FormInput
          ref={usernameSettingsValidation}
          id="username"
          error={errors.username}
          label="Username"
          type="text"
          name="username"
          serverErrors={serverErrors}
        />

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

        <FormInput
          ref={passwordRepeatSettingsValidation}
          id="passwordRepeat"
          error={errors.passwordRepeat}
          label="Repeat Password"
          type="password"
          name="passwordRepeat"
          serverErrors={serverErrors}
        />

        <div className={classes.SignUp__Agreement}>
          <label htmlFor="checkbox" className={classes.SignUp__Label}>
            <input
              className={classes.SignUp__Checkbox}
              id="checkbox"
              name="checkbox"
              type="checkbox"
              ref={agreementSettingsValidation}
            />
            I agree to the processing of my personal information
          </label>
          {errors.checkbox && <p style={{ margin: 0, color: '#f5222d' }}>{errors.checkbox.message}</p>}
        </div>

        <Button className={classes.SignUp__Submit} type="primary" htmlType="submit">
          Create
        </Button>
        <p className={classes.SignUp__Question}>
          Already have an account? <Link to="/sign-in">Sign In.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignUp;
