import { Image, StyleSheet, Text, View } from "react-native";

import { User } from "../contexts/UsersContext";
import colors from "../config/colors";

const UserCard = ({ user }: { user: User }) => {
  return (
    <View style={styles.userCard}>
      <Image source={{ uri: user.profileImage }} style={styles.profileImage} />
      <View style={styles.userInfo}>
        <View style={styles.nameRow}>
          <Text style={styles.name}>{user.name}</Text>
          {user.verified && (
            <Image
              source={require("../assets/verified.png")}
              style={styles.verificationIcon}
            />
          )}
        </View>
        <Text style={styles.username}>@{user.username}</Text>
        {user.bio && (
          <Text style={styles.bio} numberOfLines={1}>
            {user.bio}
          </Text>
        )}
      </View>
    </View>
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
