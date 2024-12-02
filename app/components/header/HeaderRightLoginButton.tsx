import React from "react";
import { StyleSheet, TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { routes } from "../../navigation";
import { useUser } from "../../hooks";
import colors from "../../config/colors";
import Text from "../Text";

export default () => {
  const { user } = useUser();
  const navigation = useNavigation();

  if (user) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(routes.AUTH as never)}
    >
      <Text style={styles.text}>Login</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 18,
  },
  text: {
    color: colors.blue,
    fontSize: 17,
    fontWeight: "800",
    letterSpacing: 0.2,
  },
});
