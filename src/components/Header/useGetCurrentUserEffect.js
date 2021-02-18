import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions/actions';

const useGetCurrentUserEffect = (articlesService) => {
  const dispatch = useDispatch();
  const token = localStorage.getItem('token');
  useEffect(() => {
    if (token) {
      articlesService
        .getCurrentUser()
        .then((body) => {
          dispatch(setUser(body.user));
        })
        .catch((err) => console.log(err));
    }
  }, [token, dispatch, articlesService]);
};

export default useGetCurrentUserEffect;
