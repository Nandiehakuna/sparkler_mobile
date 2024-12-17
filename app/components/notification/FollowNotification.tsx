import { useState } from "react";
import { Modal, StyleSheet, View } from "react-native";
import { NotificationActivity } from "getstream";
import { UserBar } from "expo-activity-feed";
import Icon from "@expo/vector-icons/FontAwesome6";

import { ActivityActor } from "../../utils/types";
import { routes } from "../../navigation";
import { useNavigation } from "../../hooks";
import AppButton from "../Button";
import colors from "../../config/colors";
import Notification from "./Notification";
import Text from "../Text";

interface Props {
  activityGroup: NotificationActivity;
}

export default ({ activityGroup }: Props) => {
  const [showFollowers, setShowFollowers] = useState(false);
  const navigation = useNavigation();

  const { activities } = activityGroup;

  const getFollowers = (): ActivityActor[] =>
    activities.map((a) => a.actor as unknown as ActivityActor);

  const viewFollowerProfile = (follower: ActivityActor) => {
    setShowFollowers(false);
    navigation.navigate(routes.PROFILE, follower);
  };

  const ModalContent = (
    <Modal animationType="slide" visible={showFollowers}>
      <View style={styles.followersContainer}>
        <Text style={styles.title}>New Followers</Text>
        {getFollowers().map((follower) => {
          const { id, data } = follower;

          return (
            <View style={styles.follower} key={id}>
              <UserBar
                username={data.name}
                subtitle={data.username}
                avatar={data.profileImage}
                onPressAvatar={() => viewFollowerProfile(follower)}
              />
            </View>
          );
        })}

        <AppButton
          title="Close"
          color="blue"
          onPress={() => setShowFollowers(false)}
        />
      </View>
    </Modal>
  );

  return (
    <Notification
      Icon={<Icon name="user-plus" size={24} color={colors.blue} />}
      activityGroup={activityGroup}
      action="followed you"
      Other={ModalContent}
      onPress={() => setShowFollowers(true)}
    />
  );
};

const styles = StyleSheet.create({
  follower: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    paddingVertical: 5,
  },
  followersContainer: {
    padding: 15,
  },
  name: {
    fontWeight: "bold",
  },
  textContainer: {
    flexDirection: "row",
  },
  title: { textAlign: "center", marginBottom: 5 },
});
