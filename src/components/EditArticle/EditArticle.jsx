import { Alert, Spin } from 'antd';
import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import ArticlesService from '../../services/ArticlesService';
import TagForm from '../TagForm/TagForm';
import NewArticleForm from '../NewArticleForm/NewArticleForm';
import TagList from '../TagList/TagList';
import { addTag, deleteTag } from '../../utils/addTagDeleteTag';
import classes from '../NewArticle/NewArticle.module.scss';
import cls from './EditArticle.module.scss';

const EditArticle = () => {
  const [item, setArticle] = useState(null);
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const articlesService = new ArticlesService();
  const history = useHistory();
  const { slug } = useParams();

  useEffect(() => {
    articlesService
      .getArticle(slug)
      .then(({ article }) => {
        setLoading(false);
        setArticle(article);
        setTags(article.tagList.map((tag) => ({ name: tag, id: `${tag}${Math.random()}` })));
      })
      .catch(() => {
        setLoading(false);
        setError(true);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [slug]);

  const submitArticle = ({ title, description, body }) => {
    const tagList = tags.map((tag) => tag.name);
    const requestBody = {
      article: {
        title,
        description,
        body,
        tagList,
      },
    };
    articlesService
      .updateArticle(requestBody, slug)
      .then(({ article }) => {
        history.push(`/articles/${article.slug}`);
      })
      .catch((err) => console.log(err));
  };

  if (hasError) {
    return <Alert message="Error" description="Couldn't find the article" type="error" showIcon />;
  }

  if (isLoading) {
    return <Spin className={cls.Spin} size="large" tip="Loading..." />;
  }

  return (
    <div className={classes.NewArticle}>
      <h2 className={classes.NewArticle__Title}>Edit Article</h2>
      {item && <NewArticleForm onSubmitArticle={submitArticle} article={item} />}
      <TagList tags={tags} onDeleteTag={(tag) => deleteTag(tags, tag, setTags)} />
      <TagForm onAddTag={(tag) => addTag(tags, tag, setTags)} />
    </div>
  );
};

export default EditArticle;
