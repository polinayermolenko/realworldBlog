import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import ArticlesService from '../../services/ArticlesService';

const useArticle = (article) => {
  const [item, setArticle] = useState(article);
  const articlesService = useMemo(() => new ArticlesService(), []);
  const [isLikeRequestSending, setLikeRequest] = useState(false);
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const username = useSelector(({ userData: { user = {} } }) => user.username);
  const token = useSelector(({ userData: { user = {} } }) => user.token);

  useEffect(() => {
    setArticle(article);
  }, [article]);

  const { slug, favorited } = item;

  const onButtonEditClick = () => {
    history.push(`/articles/${slug}/edit`);
  };

  const onFavoriteArticle = () => {
    if (token) {
      setLikeRequest(true);
      articlesService
        .favoriteArticle(slug, token, favorited)
        .then((result) => {
          setLikeRequest(false);
          setArticle(result.article);
        })
        .catch(() => {
          setLikeRequest(false);
          setErrors(true);
        });
    } else {
      history.push('/sign-in');
    }
  };

  return { onFavoriteArticle, item, username, errors, isLikeRequestSending, onButtonEditClick };
};

export default useArticle;
