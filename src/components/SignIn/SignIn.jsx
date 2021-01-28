import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import classes from './SignIn.module.scss';

const SignIn = () => (
  <div className={classes.SignIn}>
    <form action="">
      <h1 className={classes.SignIn__Title}>Sign In</h1>
      <label htmlFor="email">Email Address</label>
      <Input className={classes.SignIn__Input} id="email" placeholder="Email address" type="email" />
      <label htmlFor="password">Password</label>
      <Input className={classes.SignIn__Input} id="password" placeholder="Password" type="password" />
      <Button className={classes.SignIn__Submit} type="primary" htmlType="submit">
        Login
      </Button>
      <p className={classes.SignIn__Question}>
        Don&apos;t you have an account? <Link to="/sign-up">Sign Up.</Link>
      </p>
    </form>
  </div>
);

export default SignIn;
