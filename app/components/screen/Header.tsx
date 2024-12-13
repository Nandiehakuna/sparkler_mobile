import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import Icon from "@expo/vector-icons/Feather";

import { useNavigation } from "../../hooks";
import colors from "../../config/colors";
import Text from "../Text";

interface Props {
  buttonTitle: string;
  disable: boolean;
  loading: boolean;
  onButtonPress: () => void;
}

export default ({ buttonTitle, disable, loading, onButtonPress }: Props) => {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      <Icon
        name="x"
        size={25}
        color={colors.medium}
        onPress={() => navigation.goBack()}
      />

      <TouchableOpacity
        style={[
          styles.button,
          { backgroundColor: disable ? colors.light : colors.blue },
        ]}
        onPress={onButtonPress}
      >
        <Text style={styles.buttonTitle}>
          {loading ? buttonTitle + "ing..." : buttonTitle}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  buttonTitle: {
    color: colors.white,
    fontWeight: "bold",
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    width: "100%",
  },
});
