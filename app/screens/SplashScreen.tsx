import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "../components";

export default () => {
  return (
    <View style={styles.container}>
      <Text style={styles.logo}>Sparkler</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  logo: {
    fontSize: 35,
    fontWeight: 400,
  },
});
