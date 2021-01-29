import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ArticlesListContainer from '../../containers/ArticlesListContainer/ArticlesListContainer';
import Header from '../Header/Header';
import ArticlePage from '../../containers/ArticlePage/ArticlePage';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import EditProfile from '../EditProfile/EditProfile';

import classes from './App.module.scss';
import 'antd/dist/antd.css';

const App = () => (
  <Router>
    <div className={classes.App}>
      <Header />
      <main className={classes.Main}>
        <Route path="/" component={ArticlesListContainer} exact />
        <Route path="/articles" component={ArticlesListContainer} exact />
        <Route
          path="/articles/:slug"
          render={({ match }) => {
            const { slug } = match.params;
            return <ArticlePage slug={slug} />;
          }}
          exact
        />
        <Route path="/sign-in" component={SignIn} exact />
        <Route path="/sign-up" component={SignUp} exact />
        <Route path="/profile" component={EditProfile} exact />
      </main>
    </div>
  </Router>
);

export default App;
