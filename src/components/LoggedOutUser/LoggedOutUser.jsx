import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../Header/Header.module.scss';

const LoggedOutUser = () => (
  <div className={classes.Header__LoggedOut}>
    <Link className={classes.Header__SignIn} to="/sign-in">
      Sign In
    </Link>
    <Link className={classes.Header__SignUp} to="/sign-up">
      Sign Up
    </Link>
  </div>
);

export default LoggedOutUser;
