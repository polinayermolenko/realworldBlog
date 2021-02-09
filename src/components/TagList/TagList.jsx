import React from 'react';
import { Button } from 'antd';
import PropTypes from 'prop-types';
import classes from './TagList.module.scss';

const TagList = ({ tags, onDeleteTag }) => {
  const elements = tags.map(({ id, name }) => (
    <li key={id} className={classes.Tags__Item}>
      <span className={classes.Tags__Tag}>{name}</span>
      <Button
        className={classes.Tags__Delete}
        onClick={() => {
          onDeleteTag(id);
        }}
      >
        Delete
      </Button>
    </li>
  ));

  return (
    <div>
      <ul className={classes.Tags__List}>{elements}</ul>
    </div>
  );
};

export default TagList;

TagList.defaultProps = {
  tags: [],
  onDeleteTag: () => {},
};

TagList.propTypes = {
  tags: PropTypes.arrayOf(PropTypes.object),
  onDeleteTag: PropTypes.func,
};
