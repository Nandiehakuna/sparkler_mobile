import React from "react";
import {
  View,
  Image,
  TextInput,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import Icon from "@expo/vector-icons/Feather";

import { ActorName } from "../components/sparkle";
import { SparkleActivity } from "../utils/types";
import { Text } from "../components";
import { useNavigation, useUser } from "../hooks";
import colors from "../config/colors";

export default function ReplyScreen({ route }) {
  const navigation = useNavigation();
  const { user } = useUser();

  const activity = route.params.activity as SparkleActivity;

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Icon
          name="x"
          size={25}
          color={colors.black}
          onPress={() => navigation.goBack()}
        />
        <TouchableOpacity style={styles.commentButton}>
          <Text style={styles.postButtonText}>Comment</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.sparkleContainer}>
        <View>
          <View style={styles.row}>
            <Image
              source={{ uri: activity.actor.data.profileImage }}
              style={styles.avatar}
            />
            <View style={styles.postContent}>
              <ActorName actor={activity.actor} time={activity.time} />
              <View style={styles.textImageRow}>
                <Text style={styles.text}>{activity.object.data.text}</Text>
                {activity.attachments?.images && (
                  <Image
                    source={{ uri: activity.attachments.images[0] }}
                    style={styles.smallMedia}
                  />
                )}
              </View>
            </View>
          </View>
        </View>

        <View style={styles.replyLine} />
        <View style={styles.replyContainer}>
          <Image source={{ uri: user?.profileImage }} style={styles.avatar} />
          <TextInput
            style={styles.replyInput}
            placeholder="Write your comment..."
            multiline
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  sparkleContainer: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
  },
  header: {
    alignItems: "center",
    backgroundColor: colors.white,
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 15,
    width: "100%",
  },
  row: {
    flexDirection: "row",
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 12,
  },
  postContent: {
    flex: 1,
  },
  text: {
    color: colors.medium,
    fontSize: 14,
  },
  media: {
    marginTop: 8,
    width: "100%",
    height: 200,
    borderRadius: 8,
  },
  replyLine: {
    height: 140,
    width: 1.5,
    backgroundColor: "#444",
    marginLeft: 20,
    marginBottom: 10,
  },
  replyContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 16,
  },
  replyInput: {
    backgroundColor: colors.light,
    flex: 1,
    color: colors.medium,
    fontSize: 16,
    borderRadius: 8,
    padding: 12,
    minHeight: 50,
  },
  actionText: {
    color: "#1d9bf0",
    fontSize: 14,
  },
  commentButton: {
    backgroundColor: "#1d9bf0",
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  postButtonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  textImageRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  smallMedia: {
    width: 80, // Smaller width for the image
    height: 80, // Smaller height for the image
    borderRadius: 4, // Add a small border radius for better aesthetics
    marginLeft: 8, // Add spacing between text and image
  },
});
