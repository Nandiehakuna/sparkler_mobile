import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import { StyleSheet } from "react-native";

import colors from "../../config/colors";

export default () => {
  const navigation = useNavigation();

  return (
    <MaterialCommunityIcons
      name="chevron-left"
      size={30}
      color={colors.medium}
      style={styles.icon}
      onPress={() => navigation.goBack()}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 7,
  },
});
