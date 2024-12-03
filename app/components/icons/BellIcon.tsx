import React from "react";
import { OpaqueColorValue } from "react-native";
import Icon from "@expo/vector-icons/Feather";

import colors from "../../config/colors";

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
}

export default ({ color = colors.medium, size = 18 }: Props) => {
  return <Icon name="bell" size={size} color={color} />;
};
