import { useEffect, useState } from 'react';
import useBaseHooks from './useBaseHooks';

const useGetArticleEffect = () => {
  const [item, setArticle] = useState(null);
  const [hasError, setError] = useState(false);
  const [isLoading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);
  const { history, slug, articlesService } = useBaseHooks();

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

  return { item, hasError, isLoading, tags, history, setTags, articlesService, slug, setError };
};

export default useGetArticleEffect;
