import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ActivityActor } from "../../utils/types";
import { getTimeText } from "../../utils/time";
import colors from "../../config/colors";

interface Props {
  actor: ActivityActor;
  time: string;
  onPress?: () => void;
}

export default function ActivityActorName({ actor, time, onPress }: Props) {
  const { name, username, verified } = actor.data;

  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      <View style={styles.textContainer}>
        <Text numberOfLines={1} style={styles.name}>
          {name}
        </Text>
        {verified && (
          <Image
            source={require("../../assets/verified.png")}
            style={styles.verifiedIcon}
          />
        )}
        <Text numberOfLines={1} style={styles.username}>
          @{username}
        </Text>
      </View>
      <Text style={styles.time}>. {getTimeText(time)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  textContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    overflow: "hidden",
  },
  name: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.black,
    marginRight: 5,
    flexShrink: 1,
  },
  verifiedIcon: {
    width: 14,
    height: 14,
    marginRight: 5,
  },
  username: {
    fontSize: 12,
    color: colors.primary,
    flexShrink: 1,
  },
  time: {
    fontSize: 12,
    color: colors.dark,
    marginLeft: 10,
    flexShrink: 0,
  },
});
