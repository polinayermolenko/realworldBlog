import { useEffect, useState } from 'react';
import ArticlesService from '../../services/ArticlesService';

const useGetArticlesEffect = () => {
  const articlesService = new ArticlesService();
  const [articlesList, setAtricles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);

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

  return { onPageChange, articlesList, hasError, isLoading, activePage };
};

export default useGetArticlesEffect;
