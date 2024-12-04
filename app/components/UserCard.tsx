import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { ActorName } from "./sparkle";
import { getActorFromUser } from "../utils/funcs";
import { routes, useNavigation } from "../navigation";
import { User } from "../contexts/UsersContext";
import colors from "../config/colors";
import Text from "./Text";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  const navigation = useNavigation();
  const { profileImage, bio, timestamp } = user;

  const visitProfile = () =>
    navigation.navigate(routes.PROFILE, getActorFromUser(user));

  return (
    <TouchableOpacity style={styles.userCard} onPress={visitProfile}>
      <Image source={{ uri: profileImage }} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <ActorName
          actor={getActorFromUser(user)}
          time={timestamp}
          onPress={visitProfile}
        />
        {Boolean(bio?.length) && (
          <Text style={styles.bio} numberOfLines={2}>
            {bio}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 1,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  userInfo: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  verificationIcon: {
    width: 16,
    height: 16,
    marginLeft: 6,
  },
  username: {
    color: colors.primary,
    fontSize: 14,
    marginVertical: 2,
  },
  bio: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
});

export default UserCard;
