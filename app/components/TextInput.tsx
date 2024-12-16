import React, { useState } from "react";
import {
  DimensionValue,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

import colors from "../config/colors";

export type IconName = React.ComponentProps<
  typeof MaterialCommunityIcons
>["name"];

interface Props extends TextInputProps {
  icon?: IconName;
  width?: DimensionValue;
}

export default function AppTextInput({
  icon,
  width = "100%",
  ...otherProps
}: Props) {
  const [inputHeight, setInputHeight] = useState(50);

  return (
    <View style={[styles.container, { width }]}>
      {icon && (
        <MaterialCommunityIcons
          name={icon}
          size={20}
          color={colors.medium}
          style={styles.icon}
        />
      )}

      <TextInput
        multiline
        placeholderTextColor={colors.medium}
        style={[styles.textInput, { height: inputHeight }]}
        onContentSizeChange={(event) =>
          setInputHeight(event.nativeEvent.contentSize.height)
        }
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 30,
    flexDirection: "row",
    padding: 15,
    marginVertical: 10,
    alignItems: "center",
  },
  icon: {
    marginRight: 10,
  },
  textInput: {
    backgroundColor: colors.light,
    borderRadius: 8,
    color: colors.dark,
    fontFamily: "Quicksand_400Regular",
    fontSize: 20,
    lineHeight: 22,
    padding: 12,
    textAlignVertical: "top",
  },
});
