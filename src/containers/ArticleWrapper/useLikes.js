import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ArticlesService from '../../services/ArticlesService';
import { getFromLStorage, removeFromLStorage, setToLStorage } from '../../utils/localStorage';

const useLikes = (receivedArticle) => {
  const articlesService = new ArticlesService();
  const { slug } = receivedArticle;
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const [isFavorite, setFavorite] = useState(getFromLStorage(slug));
  const [item, setArticle] = useState(receivedArticle);
  const [isLikeRequestSending, setLikeRequest] = useState(false);

  const setFavoriteArticle = () => {
    if (getFromLStorage('token')) {
      setLikeRequest(true);
      articlesService
        .setFavoriteArticle(slug)
        .then(({ article }) => {
          setLikeRequest(false);
          setArticle(article);
          setToLStorage(slug, article.favorited);
          setFavorite(getFromLStorage(slug));
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
        removeFromLStorage(slug);
        setFavorite(setToLStorage(slug));
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
