import React from "react";
import { StyleSheet, View } from "react-native";
import { FlatFeed } from "expo-activity-feed";

import { ActivityIndicator, Sparkle } from "../components";
import { ScreenProps } from "../utils/types";

export default ({ navigation }: ScreenProps) => {
  return (
    <View style={styles.container}>
      <FlatFeed
        Activity={(props) => <Sparkle {...props} navigation={navigation} />}
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