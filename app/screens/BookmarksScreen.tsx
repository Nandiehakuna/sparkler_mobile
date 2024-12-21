import { StyleSheet, View } from 'react-native';

import { Text } from '../components';

export default () => {
  return (
    <View style={styles.container}>
      <Text>Bookmarks</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {},
});
