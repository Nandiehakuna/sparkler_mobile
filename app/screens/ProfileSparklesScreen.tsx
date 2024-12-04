import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { FlatFeed } from "expo-activity-feed";

import { Sparkle } from "../components";
import { useProfileUserContext } from "../hooks";

export default () => {
  const { profileUser } = useProfileUserContext();

  if (!profileUser) return <Text>Something went wrong</Text>;

  return (
    <View style={styles.container}>
      <FlatFeed
        feedGroup="user"
        Activity={(props) => <Sparkle {...props} />}
        notify
        userId={profileUser.id}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
