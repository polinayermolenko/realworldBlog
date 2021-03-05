import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import UserService from '../../services/UserService';
import { setLoggedIn, setUser } from '../../actions/actions';
import { setToLStorage } from '../../utils/localStorage';

const useLogInUser = (setServerErrors) => {
  const [error, setErrors] = useState(null);
  const userService = new UserService();
  const dispatch = useDispatch();
  const auth = useSelector(({ loggedIn = false }) => loggedIn);

  const onSubmit = ({ email, password }) => {
    const requestBody = {
      user: {
        email,
        password,
      },
    };
    userService
      .logInUser(requestBody)
      .then((body) => {
        if (body.errors) {
          setServerErrors(body.errors);
          return;
        }
        dispatch(setLoggedIn(true));
        setToLStorage('token', body.user.token);
        dispatch(setUser(body.user));
      })
      .catch((err) => setErrors(err));
  };
  return { onSubmit, auth, error };
};

export default useLogInUser;
