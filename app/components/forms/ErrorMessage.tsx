import { StyleSheet } from 'react-native';

import colors from '../../config/colors';
import Text from '../Text';

interface Props {
  error: string;
  visible: boolean;
}

export default function ErrorMessage({ error, visible }: Props) {
  if (!visible || !error) return null;

  return <Text style={styles.error}>{error}</Text>;
}

const styles = StyleSheet.create({
  error: {
    color: colors.danger,
    textAlign: 'center',
  },
});
