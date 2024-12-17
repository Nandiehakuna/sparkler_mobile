import { StyleSheet, View } from "react-native";
import { NotificationActivity } from "getstream";

import LikeNotification from "./LikeNotification";
import FollowNotification from "./FollowNotification";
import CommentNotification from "./CommentNotification";

interface Props {
  activityGroup: NotificationActivity;
}

export default ({ activityGroup }: Props) => {
  const { verb } = activityGroup;

  return (
    <View style={styles.container}>
      {(verb === "sparkle" || verb === "tweet") && (
        <LikeNotification activityGroup={activityGroup} />
      )}
      {verb === "like" && <LikeNotification activityGroup={activityGroup} />}
      {verb === "follow" && (
        <FollowNotification activityGroup={activityGroup} />
      )}
      {verb === "comment" && (
        <CommentNotification activityGroup={activityGroup} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
