import React from "react";
import { StyleSheet, View } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";

import colors from "../../config/colors";

export default () => {
  return (
    <View style={{ position: "relative" }}>
      <View style={styles.container}>
        <Ionicons name="add" size={14} style={styles.plusIcon} />
        <Ionicons name="sparkles-sharp" size={25} style={styles.sparklesIcon} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    justifyContent: "center",
  },
  plusIcon: {
    color: colors.white,
    marginBottom: 6,
  },
  sparklesIcon: {
    color: colors.white,
  },
});
