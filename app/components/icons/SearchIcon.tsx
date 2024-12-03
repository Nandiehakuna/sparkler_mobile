import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import colors from "../../config/colors";

interface Props {
  size?: number;
}

export default ({ size = 18 }: Props) => {
  return <FontAwesome name="search" size={size} color={colors.medium} />;
};
