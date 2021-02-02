import React from 'react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import { Button } from 'antd';
import isEmail from 'validator/es/lib/isEmail';
import classes from './SignIn.module.scss';
import FormInput from '../FormInput/FormInput';

const SignIn = () => {
  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

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
        />

        <FormInput
          ref={passwordSettingsValidation}
          id="password"
          error={errors.password}
          label="Password"
          type="password"
          name="password"
        />
        <Button className={classes.SignIn__Submit} type="primary" htmlType="submit">
          Login
        </Button>
        <p className={classes.SignIn__Question}>
          Don&apos;t you have an account? <Link to="/sign-up">Sign Up.</Link>
        </p>
      </form>
    </div>
  );
};

export default SignIn;
