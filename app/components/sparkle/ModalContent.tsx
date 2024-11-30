import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";

import Text from "../Text";

interface Props {
  Icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

export default ({ Icon, label, onPress }: Props) => {
  return (
    <TouchableOpacity style={styles.container} onPress={onPress}>
      {Icon}
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    flexDirection: "row",
    padding: 10,
  },
  text: {
    marginLeft: 5,
    fontSize: 18,
  },
});
