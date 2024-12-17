import { useState } from "react";
import Icon from "@expo/vector-icons/Feather";

import { NotificationActivity } from "getstream";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { Sparkle } from "../sparkle";
import colors from "../../config/colors";
import Notification from "./Notification";
import Text from "../Text";

interface Props {
  activityGroup: NotificationActivity;
}

export default ({ activityGroup }: Props) => {
  const [showSparkles, setShowSparkles] = useState(false);

  const { activities, verb } = activityGroup;

  const MentionSparkles = (
    <View>
      <TouchableOpacity onPress={() => setShowSparkles(!showSparkles)}>
        <Text style={styles.text}>
          {showSparkles ? "Hide" : "Show"} sparkles
        </Text>
      </TouchableOpacity>

      {showSparkles &&
        activities.map((sparkle) => (
          <Sparkle key={sparkle.id} activity={sparkle} />
        ))}
    </View>
  );

  if (verb === "tweet" || verb === "sparkle")
    return (
      <Notification
        action="mentioned you in their sparkle"
        Icon={<Icon name="at-sign" size={24} color="black" />}
        activityGroup={activityGroup}
        onPress={() => setShowSparkles(true)}
        Other={MentionSparkles}
      />
    );

  return null;
};

const styles = StyleSheet.create({
  text: {
    color: colors.blue,
    marginBottom: 5,
  },
});
