import { useEffect, useMemo, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../actions/actions';
import UserService from '../../services/UserService';
import { getFromLStorage } from '../../utils/localStorage';

const useGetCurrentUserEffect = () => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);
  const token = getFromLStorage('token');
  const userService = useMemo(() => new UserService(), []);
  const auth = useSelector(({ loggedIn = false }) => loggedIn);

  useEffect(() => {
    if (token) {
      userService
        .getCurrentUser(token)
        .then((body) => {
          dispatch(setUser(body.user));
        })
        .catch(() => setErrors(true));
    }
  }, [token, dispatch, userService, setErrors, errors]);

  return { auth };
};

export default useGetCurrentUserEffect;
