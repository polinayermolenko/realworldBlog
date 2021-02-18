import React from 'react';
import { Alert, Pagination, Spin } from 'antd';
import ArticlesList from '../../components/ArticlesList/ArticlesList';
import useGetArticlesEffect from './useGetAtriclesEffect';
import classes from './ArticlesListContainer.module.scss';

const ArticlesListContainer = () => {
  const { articlesList, activePage, isLoading, hasError, onPageChange } = useGetArticlesEffect();

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
