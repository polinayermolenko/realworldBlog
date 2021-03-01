import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import ArticlesService from '../../services/ArticlesService';

const useGetArticlesEffect = () => {
  const articlesService = useMemo(() => new ArticlesService(), []);
  const [articlesList, setAtricles] = useState([]);
  const [activePage, setActivePage] = useState(1);
  const [isLoading, setLoading] = useState(true);
  const [hasError, setError] = useState(false);
  const token = useSelector(({ userData: { user = {} } }) => user.token);

  useEffect(() => {
    articlesService
      .getArticles(token)
      .then(({ articles }) => {
        setLoading(false);
        setAtricles(articles);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [articlesService, token]);

  const onPageChange = (page) => {
    setLoading(true);
    articlesService
      .getArticles(page, token)
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
