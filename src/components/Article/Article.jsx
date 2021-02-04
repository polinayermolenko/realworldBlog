import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import { format, parseISO } from 'date-fns';
import classes from './Article.module.scss';

const Article = ({ article, isFull = false }) => {
  if (article) {
    const {
      title,
      slug,
      body,
      createdAt,
      tagList,
      description,
      author: { username, image },
      favouritesCount,
    } = article;

    const date = format(new Date(parseISO(createdAt)), 'MMMM d, yyyy');

    return (
      <article className={classes.Article}>
        <header className={classes.Article__Header}>
          <div className={classes.Article__Left}>
            <div className={classes.Article__TitleWrapper}>
              <h2 className={classes.Article__Title}>
                <Link className={classes.Article__Link} to={`/articles/${slug}`}>
                  {title}
                </Link>
              </h2>
              <button type="button">{favouritesCount}</button>
            </div>
            <span className={classes.Article__Tags}>{tagList}</span>
          </div>
          <div className={classes.Article__Right}>
            <div className={classes.Article__UserInfo}>
              <span>{username}</span>
              <span>{date}</span>
            </div>
            <img className={classes.Article__Avatar} src={image} width="46" height="46" alt="Avatar" />
          </div>
        </header>
        <section className={classes.Article__Body}>
          <p className={classes.Article__Description}>{description}</p>
          {isFull ? <ReactMarkdown source={body} /> : null}
        </section>
      </article>
    );
  }
  return null;
};

export default Article;

Article.defaultProps = {
  article: {},
  isFull: false,
};

Article.propTypes = {
  article: PropTypes.instanceOf(Object),
  isFull: PropTypes.bool,
};
