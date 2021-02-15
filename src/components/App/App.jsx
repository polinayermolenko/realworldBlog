import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ArticlesListContainer from '../../containers/ArticlesListContainer/ArticlesListContainer';
import Header from '../Header/Header';
import ArticlePage from '../../containers/ArticlePage/ArticlePage';
import SignIn from '../SignIn/SignIn';
import SignUp from '../SignUp/SignUp';
import EditProfile from '../EditProfile/EditProfile';
import NewArticle from '../NewArticle/NewArticle';
import EditArticle from '../EditArticle/EditArticle';
import PrivateRoute from '../PrivateRoute/PrivateRoute';
import classes from './App.module.scss';
import 'antd/dist/antd.css';

const App = () => (
  <Router>
    <div className={classes.App}>
      <Header />
      <main className={classes.Main}>
        <Switch>
          <Route path="/" component={ArticlesListContainer} exact />
          <Route path="/articles" component={ArticlesListContainer} exact />
          <Route path="/articles/:slug" component={ArticlePage} exact />
          <Route path="/sign-in" component={SignIn} exact />
          <Route path="/sign-up" component={SignUp} exact />
          <PrivateRoute path="/profile" component={EditProfile} exact />
          <PrivateRoute path="/new-article" component={NewArticle} exact />
          <PrivateRoute path="/articles/:slug/edit" component={EditArticle} exact />
          <Route path="/" component={ArticlesListContainer} />
        </Switch>
      </main>
    </div>
  </Router>
);

export default App;
