import React, { useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import UserService from '../../services/UserService';
import LoggedInUser from '../LoggedInUser/LoggedInUser';
import LoggedOutUser from '../LoggedOutUser/LoggedOutUser';
import useGetCurrentUserEffect from './useGetCurrentUserEffect';
import classes from './Header.module.scss';

const Header = () => {
  const userService = useMemo(() => new UserService(), []);
  const auth = useSelector(({ loggedIn = false }) => loggedIn);
  useGetCurrentUserEffect(userService);

  return (
    <header className={classes.Header}>
      <h1 className={classes.Header__Title}>
        <Link className={classes.Header__TitleLink} to="/">
          Realword Blog
        </Link>
      </h1>
      {auth || localStorage.getItem('token') ? <LoggedInUser /> : <LoggedOutUser />}
    </header>
  );
};

export default Header;
