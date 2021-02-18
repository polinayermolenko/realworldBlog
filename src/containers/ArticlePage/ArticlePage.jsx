import React from 'react';
import { Alert, Spin } from 'antd';
import ArticleWrapper from '../ArticleWrapper/ArticleWrapper';
import useGetArticleEffect from '../../hooks/useGetArticleEffect';
import classes from './ArticlePage.module.scss';

const ArticlePage = () => {
  const { item, hasError, isLoading } = useGetArticleEffect();

  if (hasError) {
    return <Alert message="Error" description="Couldn't find the article" type="error" showIcon />;
  }

  if (isLoading) {
    return <Spin className={classes.Spin} size="large" tip="Loading..." />;
  }

  if (item) {
    return <ArticleWrapper article={item} isFull />;
  }

  return null;
};

export default ArticlePage;
