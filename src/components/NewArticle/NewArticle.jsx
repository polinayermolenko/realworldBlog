import React, { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ArticlesService from '../../services/ArticlesService';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import NewArticleForm from '../NewArticleForm/NewArticleForm';
import TagForm from '../TagForm/TagForm';
import TagList from '../TagList/TagList';
import { addTag, deleteTag } from '../../utils/addTagDeleteTag';
import classes from './NewArticle.module.scss';

const NewArticle = () => {
  const [tags, setTags] = useState([]);
  const [error, setErrors] = useState(null);
  const articlesService = useMemo(() => new ArticlesService(), []);
  const history = useHistory();

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
      .createArticle(requestBody)
      .then(({ article: { slug } }) => history.push(`/articles/${slug}`))
      .catch(() => setErrors(true));
  };

  if (error) {
    return <ErrorIndicator />;
  }

  return (
    <div className={classes.NewArticle}>
      <h2 className={classes.NewArticle__Title}>Create new article</h2>
      <NewArticleForm onSubmitArticle={submitArticle} />
      <TagList tags={tags} onDeleteTag={(tag) => deleteTag(tags, tag, setTags)} />
      <TagForm onAddTag={(tag) => addTag(tags, tag, setTags)} />
    </div>
  );
};
export default NewArticle;
