import { useState } from 'react';
import { useHistory } from 'react-router-dom';
import ArticlesService from '../../services/ArticlesService';

const useLikes = (receivedArticle) => {
  const articlesService = new ArticlesService();
  const { slug } = receivedArticle;
  const history = useHistory();
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
        .catch((err) => console.log(err));
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
      .catch((err) => console.log(err));
  };

  const onDelete = () => {
    articlesService
      .deleteArticle(slug)
      .then(() => history.push('/'))
      .catch((err) => console.log(err));
  };

  return { setFavoriteArticle, setUnfavoriteArticle, onDelete, isFavorite, item };
};

export default useLikes;
