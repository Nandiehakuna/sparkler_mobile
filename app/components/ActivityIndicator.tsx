import React from "react";
import { ActivityIndicator, StyleSheet, View } from "react-native";

import colors from "../config/colors";

export default () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator color={colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
});
