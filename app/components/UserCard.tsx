import { Image, StyleSheet, TouchableOpacity, View } from "react-native";

import { ActorName } from "./sparkle";
import { getActorFromUser } from "../utils/funcs";
import { routes } from "../navigation";
import { useNavigation } from "../hooks";
import { User } from "../contexts/UsersContext";
import Text from "./Text";

interface Props {
  user: User;
}

const UserCard = ({ user }: Props) => {
  const navigation = useNavigation();

  const { profileImage, bio, timestamp, coverImage } = user;

  const visitProfile = () =>
    navigation.navigate(routes.PROFILE, getActorFromUser(user));

  if (coverImage)
    return (
      <TouchableOpacity style={styles.userCardWithCover} onPress={visitProfile}>
        <Image
          source={{ uri: coverImage }}
          style={styles.coverImage}
          resizeMode="cover"
        />
        <View style={styles.overlay} />
        <View style={styles.profileSectionWithCover}>
          <Image
            source={{ uri: profileImage }}
            style={styles.profileImageWithCover}
            resizeMode="cover"
          />
        </View>
        <View style={styles.userInfoWithCover}>
          <ActorName actor={getActorFromUser(user)} time={user.timestamp} />
        </View>
        <View style={styles.bioContainerWithCover}>
          {Boolean(bio?.length) && (
            <Text style={styles.bioWithCover} numberOfLines={2}>
              {bio}
            </Text>
          )}
        </View>
      </TouchableOpacity>
    );

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
  bio: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  bioContainerWithCover: {
    paddingHorizontal: 7,
    marginTop: 3,
  },
  bioWithCover: {
    fontSize: 14,
    color: "#555",
    marginTop: 4,
  },
  coverImage: {
    width: "100%",
    height: "50%",
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  overlay: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderTopLeftRadius: 12,
    borderTopRightRadius: 12,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 12,
  },
  profileImageWithCover: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 3,
    borderColor: "#fff",
  },
  profileSectionWithCover: {
    position: "absolute",
    top: "50%",
    left: 16,
    transform: [{ translateY: -30 }], // Centers the avatar
    alignItems: "center",
  },
  userCard: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 8,
    elevation: 1,
  },
  userCardWithCover: {
    backgroundColor: "#f9f9f9",
    borderRadius: 12,
    overflow: "hidden",
    marginBottom: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    height: 200,
  },
  userInfo: {
    flex: 1,
  },
  userInfoWithCover: {
    marginTop: 8,
    marginLeft: 60,
    paddingHorizontal: 24,
  },
});

export default UserCard;
