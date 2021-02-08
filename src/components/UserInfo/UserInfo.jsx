import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import classes from '../Header/Header.module.scss';
import DefaultUserAvatar from '../../img/DefaultUserAvatar.svg';

const UserInfo = (props) => {
  const {
    user: { username, image },
  } = props;
  return (
    <Link className={classes.Header__UserInfo} to="/profile">
      <span className={classes.Header__Username}>{username}</span>
      <img className={classes.Header__Avatar} src={image ?? DefaultUserAvatar} width="46" height="46" alt="Avatar" />
    </Link>
  );
};

const mapStateToProps = ({ userData: { user } }) => ({ user });

export default connect(mapStateToProps)(UserInfo);

UserInfo.defaultProps = {
  user: {},
};

UserInfo.propTypes = {
  user: PropTypes.instanceOf(Object),
};
