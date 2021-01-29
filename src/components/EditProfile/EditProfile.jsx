import React from 'react';
import { Input, Button } from 'antd';
import classes from './EditProfile.module.scss';

const EditProfile = () => (
  <div className={classes.Profile}>
    <form action="">
      <h1 className={classes.Profile__Title}>Edit profile</h1>
      <label htmlFor="username">Username</label>
      <Input className={classes.Profile__Input} id="username" placeholder="Username" />
      <label htmlFor="email">Email address</label>
      <Input className={classes.Profile__Input} id="email" placeholder="Email Address" type="email" />
      <label htmlFor="password">New Password</label>
      <Input className={classes.Profile__Input} id="password" placeholder="New Password" type="password" />
      <label htmlFor="avatar">Avatar image (url)</label>
      <Input className={classes.Profile__Input} id="avatar" placeholder="Avatar Image" type="url" />
      <Button className={classes.Profile__Submit} type="primary" htmlType="submit">
        Save
      </Button>
    </form>
  </div>
);

export default EditProfile;
