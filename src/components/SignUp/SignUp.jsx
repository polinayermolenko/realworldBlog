import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import isEmail from 'validator/es/lib/isEmail';
import FormInput from '../FormInput/FormInput';
import classes from './SignUp.module.scss';

const SignUp = () => {
  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

  const passwordValue = watch('password', '');

  const usernameSettingsValidation = register({
    required: 'Username is required',
    minLength: { value: 3, message: 'Your username needs to be at least 3 characters.' },
    maxLength: { value: 20, message: 'Your username needs to be no more than 20 characters long.' },
  });

  const emailSettingsValidation = register({
    required: 'Email is required',
    validate: () => isEmail(watch('email')) || 'Invalid email format',
  });

  const passwordSettingsValidation = register({
    required: 'Password is required',
    minLength: { value: 8, message: 'Your password needs to be at least 8 characters.' },
    maxLength: { value: 40, message: 'Your password needs to be no more than 40 characters long.' },
  });

  const passwordRepeatSettingsValidation = register({
    required: 'Password is required',
    validate: (value) => value === passwordValue || 'Passwords must match',
  });

  const agreementSettingsValidation = register({
    required: 'Please accept the terms and conditions to continue',
  });

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
        />

        <FormInput
          ref={emailSettingsValidation}
          id="email"
          error={errors.email}
          label="Email Address"
          type="email"
          name="email"
        />

        <FormInput
          ref={passwordSettingsValidation}
          id="password"
          error={errors.password}
          label="Password"
          type="password"
          name="password"
        />

        <FormInput
          ref={passwordRepeatSettingsValidation}
          id="passwordRepeat"
          error={errors.passwordRepeat}
          label="Repeat Password"
          type="password"
          name="passwordRepeat"
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
