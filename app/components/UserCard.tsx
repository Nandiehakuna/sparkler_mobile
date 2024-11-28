import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ActorName } from "./sparkle";
import { User } from "../contexts/UsersContext";
import colors from "../config/colors";

const UserCard = (user: User) => {
  const { _id, profileImage, bio, timestamp } = user;

  const visitProfile = () => {};

  const time = new Date(timestamp).toISOString();

  return (
    <TouchableOpacity style={styles.userCard} onPress={visitProfile}>
      <Image source={{ uri: profileImage }} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <ActorName
          actor={{
            data: { ...user, id: _id },
            created_at: time,
            updated_at: time,
            id: _id,
          }}
          time={timestamp}
          onPress={visitProfile}
        />
        {bio && (
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
