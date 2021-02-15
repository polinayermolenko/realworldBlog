import React, { useState } from 'react';
import PropTypes, { bool } from 'prop-types';
import Article from '../../components/Article/Article';
import ArticlesService from '../../services/ArticlesService';

const ArticleWrapper = ({ article: receivedArticle, isFull }) => {
  const articlesService = new ArticlesService();
  const { slug } = receivedArticle;
  const [isFavorite, setFavorite] = useState(localStorage.getItem(slug));
  const [item, setArticle] = useState(receivedArticle);

  const setFavoriteArticle = () => {
    articlesService
      .setFavoriteArticle(slug)
      .then(({ article }) => {
        setArticle(article);
        localStorage.setItem(slug, article.favorited);
        setFavorite(localStorage.getItem(slug));
      })
      .catch((err) => console.log(err));
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

  if (item) {
    return (
      <Article
        article={item}
        isFull={isFull}
        isFavorite={isFavorite}
        onLike={setFavoriteArticle}
        onDislike={setUnfavoriteArticle}
      />
    );
  }

  return null;
};

export default ArticleWrapper;

ArticleWrapper.defaultProps = {
  isFull: false,
};

ArticleWrapper.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
  isFull: bool,
};
