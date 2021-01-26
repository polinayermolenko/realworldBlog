import React from 'react';
import PropTypes from 'prop-types';
import classes from './Article.module.scss';

const Article = ({ article }) => {
  const {
    title,
    createdAt,
    tagList,
    description,
    author: { username, image },
  } = article;
  return (
    <article className={classes.Article}>
      <div className={classes.Article__Left}>
        <div className={classes.Article__TitleWrapper}>
          <h2 className={classes.Article__Title}>
            <a className={classes.Article__Link} href="test">
              {title}
            </a>
          </h2>
          <button type="button">12</button>
        </div>
        <span>{tagList}</span>
        <p className={classes.Article__Content}>{description}</p>
      </div>
      <div className={classes.Article__Right}>
        <div className={classes.Article__UserInfo}>
          <span>{username}</span>
          <span>{createdAt}</span>
        </div>
        <img src={image} width="46" height="46" alt="Avatar" />
      </div>
    </article>
  );
};

export default Article;

Article.propTypes = {
  article: PropTypes.instanceOf(Object).isRequired,
};
