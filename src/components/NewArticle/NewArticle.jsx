import React from 'react';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import NewArticleForm from '../NewArticleForm/NewArticleForm';
import TagForm from '../TagForm/TagForm';
import TagList from '../TagList/TagList';
import { addTag, deleteTag } from '../../utils/addTagDeleteTag';
import classes from './NewArticle.module.scss';
import useCreateNewArticle from './useCreateNewArticle';

const NewArticle = () => {
  const { setTags, tags, submitArticle, error } = useCreateNewArticle();

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
