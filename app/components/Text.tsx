import React from "react";
import { StyleSheet, Text, TextProps } from "react-native";

export default ({ children, style, ...rest }: TextProps) => {
  return (
    <Text style={[styles.text, style]} {...rest}>
      {children}
    </Text>
  );
};

const styles = StyleSheet.create({
  text: {
    fontFamily: "Quicksand_400Regular",
  },
});
