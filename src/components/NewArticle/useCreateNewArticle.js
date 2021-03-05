import { useMemo, useState } from 'react';
import { useHistory } from 'react-router-dom';
import ArticlesService from '../../services/ArticlesService';
import { getFromLStorage } from '../../utils/localStorage';

const useCreateNewArticle = () => {
  const [tags, setTags] = useState([]);
  const [error, setErrors] = useState(null);
  const articlesService = useMemo(() => new ArticlesService(), []);
  const history = useHistory();
  const token = getFromLStorage('token');

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
      .createArticle(requestBody, token)
      .then(({ article: { slug } }) => history.push(`/articles/${slug}`))
      .catch(() => setErrors(true));
  };

  return { setTags, tags, submitArticle, error };
};

export default useCreateNewArticle;
