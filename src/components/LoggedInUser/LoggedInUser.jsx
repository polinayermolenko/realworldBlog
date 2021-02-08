import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Spin } from 'antd';
import UserInfo from '../UserInfo/UserInfo';
import { setUser } from '../../actions/actions';

import classes from '../Header/Header.module.scss';

const LoggedInUser = (props) => {
  const history = useHistory();
  const { user } = props;
  return (
    <div className={classes.Header__LoggedIn}>
      <Link className={classes.Header__CreateArticle} to="/new-article">
        Create article
      </Link>
      {Object.keys(user).length === 0 ? <Spin tip="Loading..." /> : <UserInfo />}
      <button
        type="button"
        className={classes.Header__LogOut}
        onClick={() => {
          localStorage.removeItem('token');
          props.setUser({});
          history.push('/');
        }}
      >
        Log Out
      </button>
    </div>
  );
};

const mapStateToProps = ({ userData: { user } }) => ({ user });
const mapDispatchToProps = {
  setUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(LoggedInUser);

LoggedInUser.defaultProps = {
  user: {},
};

LoggedInUser.propTypes = {
  user: PropTypes.instanceOf(Object),
  setUser: PropTypes.func.isRequired,
};
