import { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { setUser } from '../../actions/actions';
import { getFromLStorage } from '../../utils/localStorage';

const useGetCurrentUserEffect = (userService) => {
  const dispatch = useDispatch();
  const [errors, setErrors] = useState(null);
  const token = getFromLStorage('token');
  useEffect(() => {
    if (token) {
      userService
        .getCurrentUser()
        .then((body) => {
          dispatch(setUser(body.user));
        })
        .catch(() => setErrors(true));
    }
  }, [token, dispatch, userService, setErrors, errors]);
};

export default useGetCurrentUserEffect;
