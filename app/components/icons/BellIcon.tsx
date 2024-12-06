import React from "react";
import { OpaqueColorValue } from "react-native";
import Icon from "@expo/vector-icons/Ionicons";

import colors from "../../config/colors";

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
  focused?: boolean;
}

export default ({ color = colors.medium, focused, size = 18 }: Props) => {
  return (
    <Icon
      name={focused ? "notifications" : "notifications-outline"}
      size={size}
      color={color}
    />
  );
};
