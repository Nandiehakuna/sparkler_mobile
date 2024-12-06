import React from "react";
import { OpaqueColorValue, TouchableOpacity } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import colors from "../../config/colors";

interface Props {
  color?: string | OpaqueColorValue | undefined;
  onPress: () => void;
  size?: number;
}

export default ({ color = colors.medium, onPress, size = 15 }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="ellipsis-vertical" size={size} color={color} />
    </TouchableOpacity>
  );
};
