import { StyleSheet, View } from 'react-native';
import LottieView from 'lottie-react-native';

import { useTheme } from '../hooks';

interface Props {
  visible: boolean;
}

export default ({ visible }: Props) => {
  const { theme } = useTheme();

  if (!visible) return null;

  return (
    <View style={[styles.overlay, { backgroundColor: theme.colors.background }]}>
      <LottieView
        autoPlay
        loop
        source={require('../assets/animations/loader.json')}
        style={styles.loader}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  loader: {
    height: 150,
    width: 150,
  },
  overlay: {
    alignItems: 'center',
    flex: 1,
    height: '100%',
    justifyContent: 'center',
    opacity: 0.8,
    position: 'absolute',
    width: '100%',
    zIndex: 1,
  },
});
