import React, { useEffect, useState } from 'react';
import { Alert, Spin } from 'antd';
import { useParams } from 'react-router-dom';
import ArticlesService from '../../services/ArticlesService';
import Article from '../../components/Article/Article';
import classes from './ArticlePage.module.scss';

const ArticlePage = () => {
  const articlesService = new ArticlesService();
  const [item, setArticle] = useState(null);
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const { slug } = useParams();

  useEffect(() => {
    articlesService
      .getArticle(slug)
      .then(({ article }) => {
        setLoading(false);
        setArticle(article);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  if (hasError) {
    return <Alert message="Error" description="Couldn't find the article" type="error" showIcon />;
  }

  if (isLoading) {
    return <Spin className={classes.Spin} size="large" tip="Loading..." />;
  }
  return <Article article={item} isFull />;
};

export default ArticlePage;
