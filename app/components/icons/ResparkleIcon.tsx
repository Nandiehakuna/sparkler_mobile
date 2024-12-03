import React from "react";
import Icon from "@expo/vector-icons/FontAwesome6";

import colors from "../../config/colors";

interface Props {
  resparkled: boolean;
  size?: number;
}

export default ({ resparkled, size = 22 }: Props) => {
  return (
    <Icon
      name="retweet"
      size={size}
      color={resparkled ? "#17BF63" : colors.medium}
    />
  );
};
