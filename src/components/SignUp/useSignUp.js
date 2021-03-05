import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setLoggedIn, setUser } from '../../actions/actions';
import UserService from '../../services/UserService';
import { setToLStorage } from '../../utils/localStorage';

const useSingUp = (setServerErrors) => {
  const userService = new UserService();
  const dispatch = useDispatch();
  const auth = useSelector(({ loggedIn = false }) => loggedIn);
  const [error, setErrors] = useState(null);

  const onSubmit = ({ username, email, password }) => {
    const requestBody = {
      user: {
        username,
        email,
        password,
      },
    };

    userService
      .registerUser(requestBody)
      .then((body) => {
        if (body.errors) {
          setServerErrors(body.errors);
          return;
        }
        setToLStorage('token', body.user.token);
        dispatch(setUser(body.user));
        dispatch(setLoggedIn(true));
      })
      .catch(() => setErrors(true));
  };

  return { auth, error, onSubmit };
};

export default useSingUp;
