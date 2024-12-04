import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatFeed } from "expo-activity-feed";

import { ActivityIndicator, Sparkle } from "../components";

export default () => {
  return (
    <View style={styles.container}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});