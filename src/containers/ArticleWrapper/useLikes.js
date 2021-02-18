import { useState } from 'react';
import useBaseHooks from '../../hooks/useBaseHooks';
import ArticlesService from '../../services/ArticlesService';

const useLikes = (receivedArticle) => {
  const articlesService = new ArticlesService();
  const { slug } = receivedArticle;
  const { setErrors, history } = useBaseHooks();
  const [isFavorite, setFavorite] = useState(localStorage.getItem(slug));
  const [item, setArticle] = useState(receivedArticle);

  const setFavoriteArticle = () => {
    if (localStorage.getItem('token')) {
      articlesService
        .setFavoriteArticle(slug)
        .then(({ article }) => {
          setArticle(article);
          localStorage.setItem(slug, article.favorited);
          setFavorite(localStorage.getItem(slug));
        })
        .catch(() => setErrors(true));
    } else {
      history.push('/sign-in');
    }
  };

  const setUnfavoriteArticle = () => {
    articlesService
      .setUnfavoriteArticle(slug)
      .then(({ article }) => {
        setArticle(article);
        localStorage.removeItem(slug);
        setFavorite(localStorage.getItem(slug));
      })
      .catch(() => setErrors(true));
  };

  const onDelete = () => {
    articlesService
      .deleteArticle(slug)
      .then(() => history.push('/'))
      .catch(() => setErrors(true));
  };

  return { setFavoriteArticle, setUnfavoriteArticle, onDelete, isFavorite, item };
};

export default useLikes;
