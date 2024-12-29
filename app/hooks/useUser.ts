import { useContext } from 'react';

import { UserContext } from '../contexts';
import authStorage from '../auth/storage';

export default () => {
  const context = useContext(UserContext);

  const logOut = () => {
    authStorage.removeToken();
    context.setUser(undefined);
  };

  return { ...context, logOut };
};
