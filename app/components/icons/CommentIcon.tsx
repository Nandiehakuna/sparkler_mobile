import React from "react";
import { OpaqueColorValue } from "react-native";
import Icon from "@expo/vector-icons/EvilIcons";

import colors from "../../config/colors";

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
}

export default ({ color = colors.medium, size = 22 }: Props) => {
  return <Icon name="comment" size={size} color={color} />;
};
