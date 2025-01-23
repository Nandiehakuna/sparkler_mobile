import { StyleSheet, View } from 'react-native';
import { FlatFeed } from 'expo-activity-feed';

import { ActivityIndicator, FloatingButton, Sparkle, Text } from '../components';
import { routes } from '../navigation';
import { ScreenProps } from '../utils/types';
import { useTheme } from '../hooks';

export default ({ navigation }: ScreenProps) => {
  const { theme } = useTheme();

  return (
    <View
      style={[styles.container, { backgroundColor: theme.colors.background, position: 'relative' }]}
    >
      <FlatFeed
        Activity={(props) => <Sparkle {...props} />}
        LoadingIndicator={ActivityIndicator}
        notify
        styles={{ ...styles.container, backgroundColor: theme.colors.background }}
        options={{
          withOwnReactions: true,
          withRecentReactions: true,
          withReactionCounts: true,
        }}
      />

      <Text style={styles.text}>Follow more Sparklers to fill your timeline</Text>
      <FloatingButton onPress={() => navigation.navigate(routes.NEW_SPARKLE)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  text: {
    textAlign: 'center',
  },
});
