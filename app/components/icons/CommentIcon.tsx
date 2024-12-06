import React from "react";
import { OpaqueColorValue } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import colors from "../../config/colors";

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
}

export default ({ color = colors.medium, size = 20 }: Props) => {
  return <Icon name="chatbubble-outline" size={size} color={color} />;
};
