import { useEffect } from 'react';
import DefaultUserAvatar from '../../img/DefaultUserAvatar.svg';

const useDefaultValuesEffect = (user, setValue) => {
  useEffect(() => {
    if (user) {
      setValue('username', `${user.username}`);
      setValue('email', `${user.email}`);
      setValue('image', `${user.image ?? DefaultUserAvatar}`);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);
};

export default useDefaultValuesEffect;
