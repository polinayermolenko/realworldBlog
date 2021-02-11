import { Button } from 'antd';
import PropTypes from 'prop-types';
import React from 'react';
import { useForm } from 'react-hook-form';
import ErrorIndicator from '../ErrorIndicator/ErrorIndicator';
import FormInput from '../FormInput/FormInput';
import classes from './NewArticleForm.module.scss';

const NewArticleForm = ({ onSubmitArticle, article = {} }) => {
  const { handleSubmit, errors, register } = useForm({
    mode: 'onChange',
    defaultValues: {
      title: article.title,
      description: article.description,
      body: article.body,
    },
  });
  const onSubmit = (data) => {
    onSubmitArticle(data);
  };

  return (
    <form className={classes.NewArticleForm} onSubmit={handleSubmit(onSubmit)}>
      <FormInput
        ref={register({
          required: 'Title is required',
        })}
        id="title"
        error={errors.title}
        label="Title"
        type="text"
        name="title"
      />

      <FormInput
        ref={register({
          required: 'Short description is required',
        })}
        id="description"
        error={errors.description}
        label="Short description"
        type="text"
        name="description"
      />

      <div className={classes.NewArticleForm__Textarea}>
        <label htmlFor="body">Text</label>
        <textarea
          className={classes.NewArtileForm__Input}
          type="textarea"
          name="body"
          id="body"
          placeholder="Text"
          ref={register({
            required: 'Text is required',
          })}
        />
        {errors.body && <ErrorIndicator errorMessage={errors.body.message} />}
      </div>

      <Button className={classes.NewArticleForm__Submit} type="primary" htmlType="submit">
        Send
      </Button>
    </form>
  );
};

export default NewArticleForm;

NewArticleForm.defaultProps = {
  article: {},
};

NewArticleForm.propTypes = {
  onSubmitArticle: PropTypes.func.isRequired,
  article: PropTypes.instanceOf(Object),
};
