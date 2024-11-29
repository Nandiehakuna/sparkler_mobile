import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

export default ({ children, ...rest }: TextProps) => {
  return (
    <Text style={styles.text} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Quicksand_400Regular",
  },
});
