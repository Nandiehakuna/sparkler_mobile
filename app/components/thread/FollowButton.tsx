import React from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";

import colors from "../../config/colors";

interface Props {
  isFollowing: boolean;
  onToggleFollow: () => void;
}

const FollowButton = ({ isFollowing, onToggleFollow }: Props) => {
  return (
    <View style={styles.container}>
      <TouchableOpacity
        onPress={onToggleFollow}
        style={[
          styles.button,
          isFollowing ? styles.following : styles.notFollowing,
        ]}
      >
        <Text
          style={[
            styles.text,
            isFollowing ? styles.followingText : styles.notFollowingText,
          ]}
        >
          {isFollowing ? "Following" : "Follow"}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "center",
  },
  button: {
    paddingVertical: 5,
    paddingHorizontal: 15,
    borderRadius: 20,
    borderWidth: 1,
  },
  notFollowing: {
    backgroundColor: colors.blue,
    borderColor: colors.blue,
  },
  following: {
    backgroundColor: "transparent",
    borderColor: "#657786",
  },
  text: {
    fontSize: 14,
    fontWeight: "bold",
  },
  notFollowingText: {
    color: colors.white,
  },
  followingText: {
    color: "#657786",
  },
});

export default FollowButton;
