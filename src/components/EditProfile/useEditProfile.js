import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { setUser } from '../../actions/actions';
import DefaultUserAvatar from '../../img/DefaultUserAvatar.svg';
import UserService from '../../services/UserService';
import { getFromLStorage } from '../../utils/localStorage';

const useEditProfile = (setValue, setServerErrors) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const currentUser = useSelector(({ userData: { user = {} } }) => user);
  const [error, setErrors] = useState(null);
  const userService = new UserService();
  const token = getFromLStorage('token');

  useEffect(() => {
    if (currentUser) {
      setValue('username', `${currentUser.username}`);
      setValue('email', `${currentUser.email}`);
      setValue('image', `${currentUser.image ?? DefaultUserAvatar}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentUser]);

  const onSubmit = ({ username, email, password, image }) => {
    const requestBody = {
      user: { username, email, password, image },
    };
    userService
      .updateUser(requestBody, token)
      .then((body) => {
        if (body.errors) {
          setServerErrors(body.errors);
          return;
        }
        dispatch(setUser(body.user));
        history.push('/');
      })
      .catch((err) => setErrors(err));
  };

  return { onSubmit, error };
};

export default useEditProfile;
