import React, { useEffect, useState } from 'react';
import ArticlesService from '../../services/ArticlesService';
import Article from '../Article/Article';
import classes from './ArticlesList.module.scss';

const ArticlesList = () => {
  const [article, setAtricles] = useState([]);
  const articlesService = new ArticlesService();

  useEffect(() => {
    articlesService.getArticles().then(({ articles }) => setAtricles(articles));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const elements = article.map((item) => (
    <li key={item.createdAt}>
      <Article article={item} />
    </li>
  ));
  return <ul className={classes.ArticlesList}>{elements}</ul>;
};

export default ArticlesList;
