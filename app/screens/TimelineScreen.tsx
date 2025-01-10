import { StyleSheet, View } from 'react-native';
import { FlatFeed } from 'expo-activity-feed';

import { ActivityIndicator, FloatingButton, Sparkle } from '../components';
import { routes } from '../navigation';
import { ScreenProps } from '../utils/types';
import { useTheme } from '../hooks';

export default ({ navigation }: ScreenProps) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <FlatFeed
        Activity={(props) => <Sparkle {...props} />}
        LoadingIndicator={ActivityIndicator}
        notify
        options={{
          withOwnReactions: true,
          withRecentReactions: true,
          withReactionCounts: true,
        }}
      />
      <FloatingButton onPress={() => navigation.navigate(routes.NEW_SPARKLE)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
});
