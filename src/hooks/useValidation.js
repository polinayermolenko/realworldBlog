import { useState } from 'react';
import { useForm } from 'react-hook-form';
import isEmail from 'validator/es/lib/isEmail';
import isURL from 'validator/es/lib/isURL';

const useValidation = () => {
  const [serverErrors, setServerErrors] = useState({
    username: null,
    email: null,
    password: null,
    'email or password': null,
  });
  const { handleSubmit, errors, watch, register, setValue } = useForm({
    mode: 'onChange',
  });

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

  const passwordEditSettingsValidation = register({
    minLength: { value: 8, message: 'Your password needs to be at least 8 characters.' },
    maxLength: { value: 40, message: 'Your password needs to be no more than 40 characters long.' },
  });

  const agreementSettingsValidation = register({
    required: 'Please accept the terms and conditions to continue',
  });

  const urlSettingsValidation = register({
    required: false,
    validate: () => isURL(watch('image')) || 'Invalid url format',
  });

  return {
    handleSubmit,
    errors,
    urlSettingsValidation,
    setValue,
    usernameSettingsValidation,
    emailSettingsValidation,
    passwordSettingsValidation,
    passwordEditSettingsValidation,
    passwordRepeatSettingsValidation,
    agreementSettingsValidation,
    serverErrors,
    setServerErrors,
  };
};

export default useValidation;
