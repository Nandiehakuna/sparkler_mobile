import { StyleSheet, View } from 'react-native';
import { NotificationFeed } from 'expo-activity-feed';

import { routes } from '../navigation';
import { useNavigation, useUser } from '../hooks';
import colors from '../config/colors';
import NotificationGroup from '../components/notification/NotificationGroup';

export default () => {
  const { user } = useUser();
  const navigation = useNavigation();

  if (!user) {
    navigation.navigate(routes.AUTH);
    return null;
  }

  return (
    <View style={styles.container}>
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
  container: { backgroundColor: colors.white, flex: 1 },
});
