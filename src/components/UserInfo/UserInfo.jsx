import React from 'react';
import { Link } from 'react-router-dom';
import classes from '../Header/Header.module.scss';
import DefaultUserAvatar from '../../img/DefaultUserAvatar.svg';
import useBaseHooks from '../../hooks/useBaseHooks';

const UserInfo = () => {
  const { currentUser } = useBaseHooks();

  return (
    <Link className={classes.Header__UserInfo} to="/profile">
      <span className={classes.Header__Username}>{currentUser.username}</span>
      <img
        className={classes.Header__Avatar}
        src={currentUser.image ?? DefaultUserAvatar}
        width="46"
        height="46"
        alt="Avatar"
      />
    </Link>
  );
};

export default UserInfo;
