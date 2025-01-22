import { routes } from '../../navigation';
import { useUser } from '../../hooks';
import HeaderText from './HeaderText';

export default () => {
  const { user } = useUser();

  return (
    <HeaderText route={user ? routes.NEW_SPARKLE : routes.AUTH} text={user ? 'Sparkle' : 'Login'} />
  );
};
