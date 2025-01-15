import { StyleSheet } from 'react-native';

import { useTheme } from '../../hooks';
import Text from '../Text';

interface Props {
  label?: string;
}

export default ({ label = 'Sparkle' }: Props) => {
  const { theme } = useTheme();

  return (
    <Text style={[styles.logo, styles.title, { color: theme.colors.text }]} isBold>
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({
  logo: {
    fontSize: 18,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
