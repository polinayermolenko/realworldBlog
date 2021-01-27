import React, { useEffect, useState } from 'react';
import { Alert, Pagination, Spin } from 'antd';
import ArticlesService from '../../services/ArticlesService';
import classes from './ArticlesListContainer.module.scss';
import ArticlesList from '../../components/ArticlesList/ArticlesList';

const ArticlesListContainer = () => {
  const [articlesList, setAtricles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

  const articlesService = new ArticlesService();

  useEffect(() => {
    articlesService
      .getArticles()
      .then(({ articles }) => {
        setLoading(false);
        setAtricles(articles);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPageChange = (page) => {
    setLoading(true);
    articlesService
      .getArticles(page)
      .then(({ articles }) => {
        setLoading(false);
        setAtricles(articles);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
    setActivePage(page);
  };

  if (isLoading) {
    return <Spin className={classes.Spin} size="large" tip="Loading..." />;
  }

  if (hasError) {
    return <Alert message="Error" description="Couldn't find the article" type="error" showIcon />;
  }

  return (
    <>
      <ArticlesList articles={articlesList} />
      <Pagination
        className={classes.Pagination}
        showSizeChanger={false}
        current={activePage}
        pageSize={10}
        total={500}
        onChange={onPageChange}
      />
    </>
  );
};

export default ArticlesListContainer;
