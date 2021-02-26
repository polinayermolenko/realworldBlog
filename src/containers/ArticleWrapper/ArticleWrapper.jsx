import React from 'react';
import PropTypes, { bool } from 'prop-types';
import Article from '../../components/Article/Article';
import useLikes from './useLikes';

const ArticleWrapper = ({ article: receivedArticle, isFull }) => {
  const { isLikeRequestSending, setFavoriteArticle, setUnfavoriteArticle, onDelete, isFavorite, item } = useLikes(
    receivedArticle
  );
  if (item) {
    return (
      <Article
        article={item}
        isFull={isFull}
        isFavorite={isFavorite}
        onLike={setFavoriteArticle}
        onDislike={setUnfavoriteArticle}
        onDelete={onDelete}
        isLikeRequestSending={isLikeRequestSending}
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
