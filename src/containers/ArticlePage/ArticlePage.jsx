import React from 'react';
import { Alert, Spin } from 'antd';
import classes from './ArticlePage.module.scss';
import Article from '../../components/Article/Article';
import ErrorIndicator from '../../components/ErrorIndicator/ErrorIndicator';
import useGetArticleEffect from './useGetArticleEffect';

const ArticlePage = () => {
  const { hasError, isLoading, errors, item, onDelete } = useGetArticleEffect();
  if (errors) {
    return <ErrorIndicator />;
  }
  if (hasError) {
    return <Alert message="Error" description="Couldn't find the article" type="error" showIcon />;
  }

  if (isLoading) {
    return <Spin className={classes.Spin} size="large" tip="Loading..." />;
  }

  if (item) {
    return <Article article={item} isFull onDelete={onDelete} />;
  }

  return null;
};

export default ArticlePage;
