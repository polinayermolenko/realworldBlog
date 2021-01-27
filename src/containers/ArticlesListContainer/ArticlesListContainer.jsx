import React, { useEffect, useState } from 'react';
import { Pagination, Spin } from 'antd';
import ArticlesService from '../../services/ArticlesService';
import classes from './ArticlesListContainer.module.scss';
import ArticlesList from '../../components/ArticlesList/ArticlesList';

const ArticlesListContainer = () => {
  const [articlesList, setAtricles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const articlesService = new ArticlesService();

  useEffect(() => {
    articlesService.getArticles().then(({ articles }) => {
      setLoading(false);
      setAtricles(articles);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const onPageChange = (page) => {
    setLoading(true);
    articlesService.getArticles(page).then(({ articles }) => {
      setLoading(false);
      setAtricles(articles);
    });
    setActivePage(page);
  };

  if (isLoading) {
    return <Spin className={classes.Spin} size="large" tip="Loading..." />;
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
