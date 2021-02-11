import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import NewArticleForm from '../NewArticleForm/NewArticleForm';
import TagForm from '../TagForm/TagForm';
import TagList from '../TagList/TagList';
import ArticlesService from '../../services/ArticlesService';
import classes from './NewArticle.module.scss';
import { addTag, deleteTag } from '../../utils/addTagDeleteTag';

const NewArticle = () => {
  const articlesService = new ArticlesService();
  const history = useHistory();
  const [tags, setTags] = useState([]);

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
      .catch((err) => console.log(err));
  };

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
