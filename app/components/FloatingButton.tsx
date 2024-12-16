import React from "react";
import { StyleSheet, TouchableWithoutFeedback, View } from "react-native";

import { SparkleIcon } from "./sparkle";
import colors from "../config/colors";

interface Props {
  Icon?: JSX.Element;
  onPress: () => void;
}

export default ({ Icon = <SparkleIcon />, onPress }: Props) => {
  return (
    <TouchableWithoutFeedback onPress={onPress}>
      <View style={styles.floatingButton}>{Icon}</View>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  floatingButton: {
    alignItems: "center",
    backgroundColor: colors.blue,
    borderRadius: 30,
    bottom: 45,
    elevation: 5,
    height: 60,
    justifyContent: "center",
    position: "absolute",
    right: 25,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3.84,
    width: 60,
  },
});
