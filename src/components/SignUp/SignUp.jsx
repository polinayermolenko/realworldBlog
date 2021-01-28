import React from 'react';
import { Link } from 'react-router-dom';
import { Input, Button } from 'antd';
import classes from './SignUp.module.scss';

const SignUp = () => (
  <div className={classes.SignUp}>
    <form action="">
      <h1 className={classes.SignUp__Title}>Sign Up</h1>
      <label htmlFor="username">Username</label>
      <Input className={classes.SignUp__Input} id="username" placeholder="Username" />
      <label htmlFor="password">Password</label>
      <Input className={classes.SignUp__Input} id="password" placeholder="Password" type="password" />
      <label htmlFor="password-repeat">Repeat Password</label>
      <Input className={classes.SignUp__Input} id="password-repeat" placeholder="Password" type="password" />
      <label htmlFor="checkbox" className={classes.SignUp__Label}>
        <Input id="checkbox" className={classes.SignUp__Checkbox} type="checkbox" defaultChecked />I agree to the
        processing of my personal information
      </label>

      <Button className={classes.SignUp__Submit} type="primary" htmlType="submit">
        Create
      </Button>
      <p className={classes.SignUp__Question}>
        Already have an account? <Link to="/sign-in">Sign In.</Link>
      </p>
    </form>
  </div>
);

export default SignUp;
