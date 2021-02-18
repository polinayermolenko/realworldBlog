import { useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory, useParams } from 'react-router-dom';
import ArticlesService from '../services/ArticlesService';

const useBaseHooks = () => {
  const dispatch = useDispatch();
  const auth = useSelector(({ loggedIn = false }) => loggedIn);
  const history = useHistory();
  const { slug } = useParams();
  const currentUser = useSelector(({ userData: { user = {} } }) => user);
  const username = useSelector(({ userData: { user = {} } }) => user.username);
  const articlesService = useMemo(() => new ArticlesService(), []);
  const [tags, setTags] = useState([]);

  return { slug, dispatch, auth, history, currentUser, username, articlesService, tags, setTags };
};

export default useBaseHooks;
