import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import colors from "../../config/colors";

interface Props {
  size?: number;
  liked: boolean;
}

export default ({ liked, size = 18 }: Props) => (
  <FontAwesome
    color={liked ? colors.primary : colors.medium}
    name={liked ? "heart" : "heart-o"}
    size={size}
  />
);
