import { StyleSheet } from 'react-native';

import { routes } from '../../navigation';
import { useUser } from '../../hooks';
import colors from '../../config/colors';
import HeaderText from './HeaderText';

export default () => {
  const { user } = useUser();

  if (user) return null;

  return <HeaderText route={routes.AUTH} text="Login" />;
};

const styles = StyleSheet.create({
  container: {
    marginRight: 18,
  },
  text: {
    color: colors.blue,
    fontSize: 17,
    letterSpacing: 0.2,
  },
});
