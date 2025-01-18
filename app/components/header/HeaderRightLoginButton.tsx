import { routes } from '../../navigation';
import { useUser } from '../../hooks';
import HeaderText from './HeaderText';

export default () => {
  const { user } = useUser();

  return (
    <HeaderText route={user ? routes.FEEDBACK : routes.AUTH} text={user ? 'Feedback' : 'Login'} />
  );
};
