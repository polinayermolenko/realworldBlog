import React, { useEffect, useMemo } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import LoggedInUser from '../LoggedInUser/LoggedInUser';
import LoggedOutUser from '../LoggedOutUser/LoggedOutUser';
import ArticlesService from '../../services/ArticlesService';
import { setUser } from '../../actions/actions';
import classes from './Header.module.scss';

const Header = () => {
  const dispatch = useDispatch();
  const auth = useSelector(({ loggedIn = false }) => loggedIn);
  const articlesService = useMemo(() => new ArticlesService(), []);
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      articlesService
        .getCurrentUser()
        .then((body) => {
          dispatch(setUser(body.user));
        })
        .catch((err) => console.log(err));
    }
  }, [token, dispatch, articlesService]);

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
