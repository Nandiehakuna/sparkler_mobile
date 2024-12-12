import React from "react";
import { StyleSheet } from "react-native";

import AppText from "../Text";

interface Props {
  error: string;
  visible: boolean;
}

export default function ErrorMessage({ error, visible }: Props) {
  if (!visible || !error) return null;

  return <AppText style={styles.error}>{error}</AppText>;
}

const styles = StyleSheet.create({
  error: {
    color: "red",
  },
});
