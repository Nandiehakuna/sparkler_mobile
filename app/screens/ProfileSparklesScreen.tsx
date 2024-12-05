import React from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Activity } from "getstream";

import { Sparkle } from "../components";
import useSparkles from "../hooks/useProfileSparkles";
import colors from "../config/colors";

export default () => {
  const { sparkles } = useSparkles();

  return (
    <View style={styles.container}>
      <FlatList
        data={sparkles}
        keyExtractor={(sparkle) => sparkle.id}
        renderItem={({ item: sparkle }) => (
          <Sparkle activity={sparkle as unknown as Activity} />
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
