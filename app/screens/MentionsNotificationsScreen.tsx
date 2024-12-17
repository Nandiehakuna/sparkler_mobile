import { StyleSheet, View } from "react-native";
import { NotificationFeed } from "expo-activity-feed";

import colors from "../config/colors";
import MentionNotification from "../components/notification/MentionNotification";

export default () => {
  return (
    <View style={styles.container}>
      <NotificationFeed
        notify
        feedGroup="notification"
        Group={MentionNotification}
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
    backgroundColor: colors.white,
    flex: 1,
  },
});
