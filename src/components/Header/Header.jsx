import React, { useEffect, useMemo } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import LoggedInUser from '../LoggedInUser/LoggedInUser';
import LoggedOutUser from '../LoggedOutUser/LoggedOutUser';
import ArticlesService from '../../services/ArticlesService';
import { setUser } from '../../actions/actions';
import classes from './Header.module.scss';

const Header = (props) => {
  const articlesService = useMemo(() => new ArticlesService(), []);
  useEffect(() => {
    if (localStorage.getItem('token')) {
      articlesService
        .getCurrentUser()
        .then((body) => {
          props.setUser(body.user);
        })
        .catch((err) => console.log(err));
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <header className={classes.Header}>
      <h1 className={classes.Header__Title}>
        <Link className={classes.Header__TitleLink} to="/">
          Realword Blog
        </Link>
      </h1>
      {localStorage.getItem('token') ? <LoggedInUser /> : <LoggedOutUser />}
    </header>
  );
};
const mapStateToProps = ({ userData: { user } }) => ({ user });
const mapDispatchToProps = { setUser };
export default connect(mapStateToProps, mapDispatchToProps)(Header);

Header.propTypes = {
  setUser: PropTypes.func.isRequired,
};
