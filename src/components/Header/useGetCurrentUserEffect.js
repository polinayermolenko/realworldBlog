import { useEffect } from 'react';
import { setUser } from '../../actions/actions';
import useBaseHooks from '../../hooks/useBaseHooks';

const useGetCurrentUserEffect = (userService) => {
  const { setErrors, dispatch } = useBaseHooks();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      userService
        .getCurrentUser()
        .then((body) => {
          dispatch(setUser(body.user));
        })
        .catch(() => setErrors(true));
    }
  }, [token, dispatch, userService, setErrors]);
};

export default useGetCurrentUserEffect;
