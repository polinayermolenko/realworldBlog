import React, { useEffect, useMemo, useState } from 'react';
import PropTypes from 'prop-types';
import ReactMarkdown from 'react-markdown';
import { Link, useHistory } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Button, Popconfirm } from 'antd';
import { format, parseISO } from 'date-fns';
import { HeartOutlined, HeartFilled, LoadingOutlined } from '@ant-design/icons';
import classes from './Article.module.scss';
import ArticlesService from '../../services/ArticlesService';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';

const Article = ({ article, isFull = false, onDelete }) => {
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

  const { title, slug, favorited, body, createdAt, tagList, description, author, favoritesCount } = item;

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

  if (errors) {
    return <ErrorIndicator />;
  }

  const isOwnArticle = username === author.username && isFull;
  const date = format(new Date(parseISO(createdAt)), 'MMMM d, yyyy');
  const likeContent = isLikeRequestSending ? (
    <LoadingOutlined className={classes.Article__LoadingLike} style={{ fontSize: '18px' }} spin />
  ) : (
    <>
      {favorited ? (
        <HeartFilled
          onClick={onFavoriteArticle}
          className={classes.Article__Heart}
          style={{ fontSize: '18px', color: '#ff0707' }}
        />
      ) : (
        <HeartOutlined onClick={onFavoriteArticle} className={classes.Article__Heart} style={{ fontSize: '18px' }} />
      )}
    </>
  );
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
            {likeContent}
            <span className={classes.Article__Like}>{favoritesCount}</span>
          </div>
          <ul className={classes.Article__Tags}>
            {tagList.map((tag) => (
              <li key={Math.random()} className={classes.Article__TagsItem}>
                {tag}
              </li>
            ))}
          </ul>
          <p className={classes.Article__Description}>{description}</p>
        </div>
        <div className={classes.Article__Right}>
          <div className={classes.Article__UserInfoWrapper}>
            <div className={classes.Article__UserInfo}>
              <span className={classes.Article__Username}>{author.username}</span>
              <span>{date}</span>
            </div>
            <img className={classes.Article__Avatar} src={author.image} width="46" height="46" alt="Avatar" />
          </div>
          {isOwnArticle ? (
            <div className={classes.Article__Buttons}>
              <Popconfirm
                placement="rightTop"
                title="Are you sure to delete this article?"
                onConfirm={onDelete}
                okText="Yes"
                cancelText="No"
              >
                <Button className={classes.Article__Delete} type="danger">
                  Delete
                </Button>
              </Popconfirm>
              <Button
                className={classes.Article__Edit}
                type="primary"
                onClick={() => history.push(`/articles/${slug}/edit`)}
              >
                Edit
              </Button>
            </div>
          ) : null}
        </div>
      </header>
      <section className={classes.Article__Body}>{isFull ? <ReactMarkdown source={body} /> : null}</section>
    </article>
  );
};

export default Article;

Article.defaultProps = {
  article: {},
  isFull: false,
  onDelete: () => {},
};

Article.propTypes = {
  article: PropTypes.instanceOf(Object),
  isFull: PropTypes.bool,
  onDelete: PropTypes.func,
};
