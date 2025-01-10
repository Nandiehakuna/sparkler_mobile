import { View, StyleSheet } from 'react-native';
import { useNetInfo } from '@react-native-community/netinfo';

import colors from '../config/colors';
import Text from './Text';

export default function OfflineNotice() {
  const netInfo = useNetInfo();

  if (netInfo.type !== 'unknown' && netInfo.isInternetReachable === false)
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No Internet Connection</Text>
      </View>
    );

  return null;
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.danger,
    height: 30,
    justifyContent: 'center',
    position: 'absolute',
    bottom: 50,
    width: '100%',
    zIndex: 1,
  },
  text: {
    color: colors.white,
  },
});
