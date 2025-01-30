import { View, StyleSheet } from 'react-native';

import { useTheme } from '../hooks';
import colors from '../config/colors';

const EndOfListIndicator = () => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.dot} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    paddingVertical: 20,
  },
  dot: {
    backgroundColor: colors.light,
    borderRadius: 4,
    height: 4,
    width: 4,
  },
});

export default EndOfListIndicator;
