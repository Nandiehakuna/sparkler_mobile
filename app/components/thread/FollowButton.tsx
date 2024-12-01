import React from "react";
import {
  TouchableOpacity,
  StyleSheet,
  View,
  ActivityIndicator,
} from "react-native";

import { useFollow } from "../../hooks";
import colors from "../../config/colors";
import Text from "../Text";

interface Props {
  userId: string;
}

const FollowButton = ({ userId }: Props) => {
  const { isFollowing, toggleFollow, loading } = useFollow({ userId });

  return (
    <View style={styles.container}>
      {loading ? (
        <ActivityIndicator />
      ) : (
        <TouchableOpacity
          onPress={toggleFollow}
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
      )}
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
