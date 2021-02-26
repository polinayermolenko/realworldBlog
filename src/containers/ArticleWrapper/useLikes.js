import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ArticlesService from '../../services/ArticlesService';

const useLikes = (receivedArticle) => {
  const articlesService = new ArticlesService();
  const { slug } = receivedArticle;
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const [isFavorite, setFavorite] = useState(localStorage.getItem(slug));
  const [item, setArticle] = useState(receivedArticle);
  const [isLikeRequestSending, setLikeRequest] = useState(false);

  const setFavoriteArticle = () => {
    if (localStorage.getItem('token')) {
      setLikeRequest(true);
      articlesService
        .setFavoriteArticle(slug)
        .then(({ article }) => {
          setLikeRequest(false);
          setArticle(article);
          localStorage.setItem(slug, article.favorited);
          setFavorite(localStorage.getItem(slug));
        })
        .catch(() => {
          setLikeRequest(false);
          setErrors(true);
        });
    } else {
      history.push('/sign-in');
    }
  };

  const setUnfavoriteArticle = () => {
    setLikeRequest(true);
    articlesService
      .setUnfavoriteArticle(slug)
      .then(({ article }) => {
        setLikeRequest(false);
        setArticle(article);
        localStorage.removeItem(slug);
        setFavorite(localStorage.getItem(slug));
      })
      .catch(() => {
        setLikeRequest(false);
        setErrors(true);
      });
  };

  const onDelete = () => {
    articlesService
      .deleteArticle(slug)
      .then(() => history.push('/'))
      .catch(() => setErrors(true));
  };

  return { isLikeRequestSending, errors, setFavoriteArticle, setUnfavoriteArticle, onDelete, isFavorite, item };
};

export default useLikes;
