import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import UserInfo from '../UserInfo/UserInfo';
import { setUser } from '../../actions/actions';
import classes from '../Header/Header.module.scss';

const LoggedInUser = (props) => {
  const history = useHistory();
  return (
    <div className={classes.Header__LoggedIn}>
      <Link className={classes.Header__CreateArticle} to="/new-article">
        Create article
      </Link>
      <UserInfo />
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

LoggedInUser.propTypes = {
  setUser: PropTypes.func.isRequired,
};
