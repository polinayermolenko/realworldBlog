import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoggedInUser from '../LoggedInUser/LoggedInUser';
import LoggedOutUser from '../LoggedOutUser/LoggedOutUser';
import classes from './Header.module.scss';

const Header = ({ user = {} }) => {
  const { token } = user;

  return (
    <header className={classes.Header}>
      <h1 className={classes.Header__Title}>
        <Link className={classes.Header__TitleLink} to="/">
          Realword Blog
        </Link>
      </h1>
      {token ? <LoggedInUser /> : <LoggedOutUser />}
    </header>
  );
};

const mapStateToProps = ({ userData: { user } }) => ({ user });

export default connect(mapStateToProps)(Header);

Header.defaultProps = {
  user: {},
};

Header.propTypes = {
  user: PropTypes.instanceOf(Object),
};
