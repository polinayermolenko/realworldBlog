import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import UserInfo from '../UserInfo/UserInfo';
import { setUser } from '../../actions/actions';

import classes from '../Header/Header.module.scss';

const LoggedInUser = () => {
  const dispatch = useDispatch();
  const currentUser = useSelector(({ userData: { user = {} } }) => user);
  const history = useHistory();

  return (
    <div className={classes.Header__LoggedIn}>
      <Link className={classes.Header__CreateArticle} to="/new-article">
        Create article
      </Link>
      {Object.keys(currentUser).length === 0 ? <Spin tip="Loading..." /> : <UserInfo />}
      <button
        type="button"
        className={classes.Header__LogOut}
        onClick={() => {
          history.go(0);
          history.push('/');
          dispatch(setUser({}));
          localStorage.removeItem('token');
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default LoggedInUser;
