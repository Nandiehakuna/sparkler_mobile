import { routes } from '../../navigation';
import { useUser } from '../../hooks';
import HeaderText from './HeaderText';

export default () => {
  const { user } = useUser();

  return user ? <HeaderText route={routes.AUTH} text="Login" /> : null;
};
