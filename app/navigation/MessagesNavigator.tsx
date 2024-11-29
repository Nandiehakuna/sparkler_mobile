import React from "react";
import { StyleSheet, View } from "react-native";

import { Text } from "../components";

export default () => {
  return (
    <View style={styles.container}>
      <Text>Messages Navigator</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
});
