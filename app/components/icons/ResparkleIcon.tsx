import React from "react";
import FontAwesome from "@expo/vector-icons/FontAwesome6";
import Feather from "@expo/vector-icons/Feather";

import colors from "../../config/colors";

interface Props {
  resparkled: boolean;
  size?: number;
}

export default ({ resparkled, size = 22 }: Props) => {
  if (resparkled)
    return <FontAwesome name="retweet" size={size} color={colors.green} />;

  return <Feather size={size} name="repeat" color={colors.medium} />;
};
