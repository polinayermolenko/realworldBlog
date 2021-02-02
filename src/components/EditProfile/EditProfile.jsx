import React from 'react';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import isEmail from 'validator/es/lib/isEmail';
import isURL from 'validator/es/lib/isURL';
import FormInput from '../FormInput/FormInput';
import classes from './EditProfile.module.scss';

const EditProfile = () => {
  const { register, handleSubmit, watch, errors } = useForm({
    mode: 'onChange',
  });

  const onSubmit = (data) => {
    console.log(data);
  };

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
    minLength: { value: 8, message: 'Your password needs to be at least 8 characters.' },
    maxLength: { value: 40, message: 'Your password needs to be no more than 40 characters long.' },
  });

  const urlSettingsValidation = register({
    required: false,
    validate: () => isURL(watch('avatar')) || 'Invalid url format',
  });

  return (
    <div className={classes.Profile}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <h1 className={classes.Profile__Title}>Edit profile</h1>
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
          id="newPassword"
          error={errors.newPassword}
          label="New Password"
          type="password"
          name="newPassword"
        />
        <FormInput
          ref={urlSettingsValidation}
          id="avatar"
          error={errors.avatar}
          label="Avatar Image"
          type="url"
          name="avatar"
        />
        <Button className={classes.Profile__Submit} type="primary" htmlType="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
