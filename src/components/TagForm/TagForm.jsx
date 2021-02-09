import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import { useForm } from 'react-hook-form';
import FormInput from '../FormInput/FormInput';
import classes from './TagForm.module.scss';

const TagForm = ({ onAddTag }) => {
  const { handleSubmit, register, errors, reset } = useForm({
    mode: 'onChange',
    defaultValues: {
      addingTag: '',
    },
  });

  const addTag = ({ addingTag }) => {
    onAddTag(addingTag);
    reset();
  };

  return (
    <form className={classes.TagForm} onSubmit={handleSubmit(addTag)}>
      <FormInput
        ref={register({
          required: 'Should not be empty',
        })}
        id="addingTag"
        error={errors.addingTag}
        label="Tags"
        type="text"
        name="addingTag"
      />

      <Button className={classes.TagForm__Submit} htmlType="submit">
        Add tag
      </Button>
    </form>
  );
};

export default TagForm;

TagForm.defaultProps = {
  onAddTag: () => {},
};

TagForm.propTypes = {
  onAddTag: PropTypes.func,
};
