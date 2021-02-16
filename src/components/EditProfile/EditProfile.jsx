import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { Button } from 'antd';
import isEmail from 'validator/es/lib/isEmail';
import isURL from 'validator/es/lib/isURL';
import ArticlesService from '../../services/ArticlesService';
import { setUser } from '../../actions/actions';
import FormInput from '../FormInput/FormInput';
import DefaultUserAvatar from '../../img/DefaultUserAvatar.svg';
import classes from './EditProfile.module.scss';

const EditProfile = () => {
  const articlesService = new ArticlesService();
  const history = useHistory();
  const dispatch = useDispatch();
  const user = useSelector(({ userData = {} }) => userData.user);
  const [serverErrors, setServerErrors] = useState({
    username: null,
    email: null,
    password: null,
  });
  const { register, handleSubmit, watch, errors, setValue } = useForm({
    mode: 'onChange',
  });

  useEffect(() => {
    if (user) {
      setValue('username', `${user.username}`);
      setValue('email', `${user.email}`);
      setValue('image', `${user.image ?? DefaultUserAvatar}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  const onSubmit = ({ username, email, password, image }) => {
    const requestBody = {
      user: { username, email, password, image },
    };
    articlesService
      .updateUser(requestBody)
      .then((body) => {
        if (body.errors) {
          setServerErrors(body.errors);
          return;
        }
        dispatch(setUser(body.user));
        history.push('/');
      })
      .catch((err) => console.log(err));
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
    validate: () => isURL(watch('image')) || 'Invalid url format',
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
          id="newPassword"
          error={errors.newPassword}
          label="New Password"
          type="password"
          name="newPassword"
          serverErrors={serverErrors}
        />
        <FormInput
          ref={urlSettingsValidation}
          id="image"
          error={errors.image}
          label="Avatar Image"
          type="url"
          name="image"
          serverErrors={serverErrors}
        />
        <Button className={classes.Profile__Submit} type="primary" htmlType="submit">
          Save
        </Button>
      </form>
    </div>
  );
};

export default EditProfile;
