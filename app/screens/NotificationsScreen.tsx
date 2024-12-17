import { StyleSheet, View } from "react-native";
import { NotificationFeed } from "expo-activity-feed";

import colors from "../config/colors";
import NotificationGroup from "../components/notification/NotificationGroup";

export default () => {
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
