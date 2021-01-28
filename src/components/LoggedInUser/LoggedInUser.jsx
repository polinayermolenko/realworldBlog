import React from 'react';
import { Link } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';
import classes from '../Header/Header.module.scss';

const LoggedInUser = () => (
  <div className={classes.Header__LoggedIn}>
    <Link className={classes.Header__CreateArticle} to="/new-article">
      Create article
    </Link>
    <UserInfo />
    <button type="button" className={classes.Header__LogOut}>
      Log Out
    </button>
  </div>
);

export default LoggedInUser;
