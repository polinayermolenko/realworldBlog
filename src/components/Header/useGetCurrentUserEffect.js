import { useEffect } from 'react';
import { setUser } from '../../actions/actions';
import useBaseHooks from '../../hooks/useBaseHooks';

const useGetCurrentUserEffect = (articlesService) => {
  const { setErrors, dispatch } = useBaseHooks();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      articlesService
        .getCurrentUser()
        .then((body) => {
          dispatch(setUser(body.user));
        })
        .catch(() => setErrors(true));
    }
  }, [token, dispatch, articlesService, setErrors]);
};

export default useGetCurrentUserEffect;
