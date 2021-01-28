import React from 'react';
import { Link } from 'react-router-dom';
import LoggedInUser from '../LoggedInUser/LoggedInUser';
import LoggedOutUser from '../LoggedOutUser/LoggedOutUser';
import classes from './Header.module.scss';

const Header = () => {
  const loggedIn = true;
  return (
    <header className={classes.Header}>
      <h1 className={classes.Header__Title}>
        <Link className={classes.Header__TitleLink} to="/">
          Realword Blog
        </Link>
      </h1>
      {loggedIn ? <LoggedInUser /> : <LoggedOutUser />}
    </header>
  );
};

export default Header;
