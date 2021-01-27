import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import ArticlesListContainer from '../../containers/ArticlesListContainer/ArticlesListContainer';
import ArticlePage from '../../containers/ArticlePage/ArticlePage';

import classes from './App.module.scss';
import 'antd/dist/antd.css';

const App = () => (
  <Router>
    <div className={classes.App}>
      <header className={classes.Header} />
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
      </main>
    </div>
  </Router>
);

export default App;
