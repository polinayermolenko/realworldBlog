import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ArticlesService from '../../services/ArticlesService';

const useEditArticleEffect = () => {
  const [item, setArticle] = useState(null);
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const history = useHistory();
  const { slug } = useParams();
  const [tags, setTags] = useState([]);
  const articlesService = useMemo(() => new ArticlesService(), []);
  const token = useSelector(({ userData: { user = {} } }) => user.token);

  useEffect(() => {
    articlesService
      .getArticle(slug, token)
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
      .updateArticle(requestBody, slug, token)
      .then(({ article }) => {
        history.push(`/articles/${article.slug}`);
      })
      .catch(() => setError(true));
  };

  return { item, hasError, isLoading, tags, setTags, articlesService, setError, submitArticle };
};

export default useEditArticleEffect;
