import { StyleSheet } from "react-native";
import { NotificationActivity } from "getstream";

import { CommentIcon } from "../icons";
import colors from "../../config/colors";
import Notification from "./Notification";

import { SparkleActivity } from "../../utils/types";
import { routes } from "../../navigation";
import { useNavigation } from "../../hooks";

interface Props {
  activityGroup: NotificationActivity;
}

export default ({ activityGroup }: Props) => {
  const navigation = useNavigation();

  const { activities } = activityGroup;
  const sparkles = activities as unknown as SparkleActivity[];
  const firstSparkle = sparkles[0];
  const reactedSparkle = firstSparkle.object;

  return (
    <Notification
      onPress={() => navigation.navigate(routes.THREAD, reactedSparkle)}
      action="commented on your sparkle"
      activityGroup={activityGroup}
      Icon={<CommentIcon color={colors.medium} size={24} />}
    />
  );
};
