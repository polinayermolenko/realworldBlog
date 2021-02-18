import React from 'react';
import { Button } from 'antd';
import ArticlesService from '../../services/ArticlesService';
import { setUser } from '../../actions/actions';
import FormInput from '../FormInput/FormInput';
import useValidation from '../../hooks/useValidation';
import useBaseHooks from '../../hooks/useBaseHooks';
import useDefaultValuesEffect from './useDefaultValuesEffect';
import classes from './EditProfile.module.scss';

const EditProfile = () => {
  const { dispatch, history, currentUser, setErrors } = useBaseHooks();
  const {
    usernameSettingsValidation,
    emailSettingsValidation,
    passwordEditSettingsValidation,
    urlSettingsValidation,
    setValue,
    handleSubmit,
    serverErrors,
    errors,
    setServerErrors,
  } = useValidation();
  const articlesService = new ArticlesService();
  useDefaultValuesEffect(currentUser, setValue);

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
      .catch(() => setErrors(true));
  };

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
          ref={passwordEditSettingsValidation}
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
