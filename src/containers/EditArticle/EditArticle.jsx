import React from 'react';
import { Alert, Spin } from 'antd';
import TagForm from '../../components/TagForm/TagForm';
import NewArticleForm from '../../components/NewArticleForm/NewArticleForm';
import TagList from '../../components/TagList/TagList';
import { addTag, deleteTag } from '../../utils/addTagDeleteTag';
import useEditArticleEffect from './useEditArticleEffect';
import classes from '../../components/NewArticle/NewArticle.module.scss';
import cls from './EditArticle.module.scss';

const EditArticle = () => {
  const { item, hasError, isLoading, tags, setTags, submitArticle } = useEditArticleEffect();

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
