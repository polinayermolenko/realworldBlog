import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ArticlesService from '../../services/ArticlesService';

const useGetArticleEffect = () => {
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const articlesService = useMemo(() => new ArticlesService(), []);
  const { slug } = useParams();
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const [item, setArticle] = useState(null);
  const token = useSelector(({ userData: { user = {} } }) => user.token);
  useEffect(() => {
    articlesService
      .getArticle(slug, token)
      .then(({ article }) => {
        setLoading(false);
        setArticle(article);
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
  }, [articlesService, slug, token]);

  const onDelete = () => {
    articlesService
      .deleteArticle(slug, token)
      .then(() => history.push('/'))
      .catch(() => setErrors(true));
  };
  return { hasError, isLoading, errors, item, onDelete };
};

export default useGetArticleEffect;
