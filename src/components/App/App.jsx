import React from 'react';
import ArticlesList from '../ArticlesList/ArticlesList';
import classes from './App.module.scss';

const App = () => (
  <div className={classes.App}>
    <header className={classes.Header} />
    <main className={classes.Main}>
      <ArticlesList />
    </main>
  </div>
);

export default App;
