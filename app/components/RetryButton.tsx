import { StyleSheet, View } from 'react-native';

import Button from './Button';

interface Props {
  onPress: VoidFunction;
  visible: boolean;
}

export default ({ onPress, visible }: Props) => {
  if (!visible) return null;

  return (
    <View style={styles.retryContainer}>
      <Button title="Retry" onPress={onPress} style={styles.retryButton} />
    </View>
  );
};

const styles = StyleSheet.create({
  retryContainer: {
    alignItems: 'center',
    marginTop: 30,
  },
  retryButton: {
    width: 'auto',
  },
});
