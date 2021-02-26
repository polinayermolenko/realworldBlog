import React from 'react';
import { Link, useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Spin } from 'antd';
import UserInfo from '../UserInfo/UserInfo';
import { setUser } from '../../actions/actions';
import { removeFromLStorage } from '../../utils/localStorage';
import classes from '../Header/Header.module.scss';

const LoggedInUser = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(({ userData: { user = {} } }) => user);

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
          removeFromLStorage('token');
        }}
      >
        Log Out
      </button>
    </div>
  );
};

export default LoggedInUser;
