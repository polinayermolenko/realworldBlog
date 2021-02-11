import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link, useHistory } from 'react-router-dom';
import { Button, Popconfirm } from 'antd';
import ReactMarkdown from 'react-markdown';
import { format, parseISO } from 'date-fns';
import ArticlesService from '../../services/ArticlesService';
import classes from './Article.module.scss';

const Article = ({ article, isFull = false, user = {} }) => {
  const history = useHistory();
  const articleService = new ArticlesService();
  const { username: currentUser } = user;
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

    const onDelete = () => {
      articleService
        .deleteArticle(slug)
        .then(() => history.push('/'))
        .catch((err) => console.log(err));
    };

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
                <span className={classes.Article__Username}>{username}</span>
                <span>{date}</span>
              </div>
              <img className={classes.Article__Avatar} src={image} width="46" height="46" alt="Avatar" />
            </div>
            {isFull && username === currentUser ? (
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
  }
  return null;
};

const mapStateToProps = ({ userData: { user } }) => ({ user });
export default connect(mapStateToProps)(Article);

Article.defaultProps = {
  user: {},
  article: {},
  isFull: false,
};

Article.propTypes = {
  user: PropTypes.instanceOf(Object),
  article: PropTypes.instanceOf(Object),
  isFull: PropTypes.bool,
};
