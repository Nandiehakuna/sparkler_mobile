import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Activity } from "getstream";

import { Sparkle } from "../components";
import { useProfileSparkles } from "../hooks";
import colors from "../config/colors";

export default () => {
  const { sparkles } = useProfileSparkles();

  return (
    <View style={styles.container}>
      <FlatList
        data={sparkles}
        keyExtractor={(sparkle) => sparkle.id}
        renderItem={({ item: sparkle }) => (
          <Sparkle activity={sparkle as unknown as Activity} onlyShowMedia />
        )}
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
