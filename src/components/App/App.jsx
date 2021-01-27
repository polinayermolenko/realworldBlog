import React from 'react';
import ArticlesListContainer from '../../containers/ArticlesListContainer/ArticlesListContainer';

import classes from './App.module.scss';
import 'antd/dist/antd.css';

const App = () => (
  <div className={classes.App}>
    <header className={classes.Header} />
    <main className={classes.Main}>
      <ArticlesListContainer />
    </main>
  </div>
);

export default App;
