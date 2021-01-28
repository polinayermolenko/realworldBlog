import React from 'react';
import { Link } from 'react-router-dom';
import classes from './Header.module.scss';

const Header = () => (
  <header className={classes.Header}>
    <h1 className={classes.Header__Title}>
      <Link className={classes.Header__TitleLink} to="/">
        Realword Blog
      </Link>
    </h1>
    <Link className={classes.Header__SignIn} to="/sign-in">
      Sign In
    </Link>
    <Link className={classes.Header__SignUp} to="/sign-up">
      Sign Up
    </Link>
  </header>
);

export default Header;
