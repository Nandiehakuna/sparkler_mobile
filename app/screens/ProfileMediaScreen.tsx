import React from "react";
import { FlatFeed } from "expo-activity-feed";
import { StyleSheet, View } from "react-native";

import { Sparkle } from "../components";
import { useProfileUserContext } from "../hooks";

export default () => {
  const { profileUser } = useProfileUserContext();

  if (!profileUser) return null;

  return (
    <View style={styles.container}>
      <FlatFeed
        feedGroup="user"
        Activity={(props) => <Sparkle onlyShowMedia {...props} />}
        notify
        userId={profileUser.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
