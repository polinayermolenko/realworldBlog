import React from 'react';
import PropTypes from 'prop-types';
import classes from './ArticlesList.module.scss';
import Article from '../Article/Article';

const ArticlesList = ({ articles }) => {
  const elements = articles.map((item) => (
    <li key={item.createdAt}>
      <Article article={item} />
    </li>
  ));
  return <ul className={classes.ArticlesList}>{elements}</ul>;
};

export default ArticlesList;

ArticlesList.propTypes = {
  articles: PropTypes.instanceOf(Array).isRequired,
};
