import React from "react";
import { StyleSheet, View } from "react-native";

import colors from "../config/colors";

export default () => {
  return <View style={styles.container} />;
};

const styles = StyleSheet.create({
  container: {
    color: colors.light,
    width: "100%",
    height: 1,
  },
});
