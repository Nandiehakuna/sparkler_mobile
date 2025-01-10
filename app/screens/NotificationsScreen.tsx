import { StyleSheet, View } from 'react-native';
import { NotificationFeed } from 'expo-activity-feed';

import { routes } from '../navigation';
import { useNavigation, useTheme, useUser } from '../hooks';
import NotificationGroup from '../components/notification/NotificationGroup';

export default () => {
  const { theme } = useTheme();
  const { user } = useUser();
  const navigation = useNavigation();

  if (!user) {
    navigation.navigate(routes.AUTH);
    return null;
  }

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <NotificationFeed
        notify
        feedGroup="notification"
        Group={NotificationGroup}
        options={{
          withOwnReactions: true,
          withReactionCounts: true,
          withRecentReactions: true,
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
