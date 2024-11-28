import React, { useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import { AntDesign } from "@expo/vector-icons";

import { Comment, Heart, Resparkle } from "../assets/icons";
import { EmbeddedSparkle, SparkleImage } from "../components/sparkle";
import { Comment as CommentBlock, FollowButton } from "../components/thread";
import { ItemSeparator } from "../components";
import { getThreadTime } from "../utils/time";
import { Reaction, ReactionId } from "../components/sparkle/Sparkle";
import { routes } from "../navigation";
import { ScreenProps, SparkleActivity } from "../utils/types";
import { useSparkle } from "../hooks";
import colors from "../config/colors";

export default ({ navigation, route }: ScreenProps) => {
  const { checkIfHasLiked, checkIfHasResparkled } = useSparkle();
  const [comment, setComment] = useState("");

  const sparkle: SparkleActivity | undefined = route.params as SparkleActivity;

  if (!sparkle) {
    navigation.navigate(routes.HOME_NAVIGATOR);
    return null;
  }

  const {
    actor,
    attachments,
    object,
    time,
    reaction_counts,
    latest_reactions,
    quoted_activity,
    verb,
  } = sparkle;
  const isAQuote = verb === "quote";
  const commentsCount = reaction_counts?.comment || 0;
  const resparklesCount = reaction_counts?.resparkle || 0;
  const likesCount = reaction_counts?.like || 0;
  const hasResparkled = checkIfHasResparkled(sparkle);
  const hasLikedSparkle = checkIfHasLiked(sparkle);
  const images: string[] = attachments?.images || [];
  const comments = latest_reactions?.comment || [];

  const reactions: Reaction[] = [
    {
      id: "comment",
      Icon: Comment,
      value: commentsCount,
      onClick: () => {},
    },
    {
      id: "resparkle",
      Icon: Resparkle,
      value: resparklesCount,
      onClick: () => {},
    },
    {
      id: "like",
      Icon: Heart,
      value: likesCount,
      onClick: () => {},
    },
    {
      id: "upload",
      Icon: () => <AntDesign name="upload" size={18} color={colors.medium} />,
      onClick: () => {},
    },
  ];

  const getColor = (id: ReactionId): string => {
    let color = colors.medium;

    if (id === "like" && hasLikedSparkle) color = colors.primary;
    else if (id === "resparkle" && hasResparkled) color = "#17BF63";

    return color;
  };

  const handleCommentSubmit = () => {};

  const toggleFollow = () => {};

  const visitProfile = () => {};

  return (
    <ScrollView style={styles.container}>
      <TouchableOpacity style={styles.profileSection} onPress={visitProfile}>
        <Image
          source={{ uri: actor.data.profileImage }}
          style={styles.profileImage}
        />
        <View style={styles.profileDetails}>
          <View style={styles.nameRow}>
            <Text style={styles.name}>{actor.data.name}</Text>
            {actor.data.verified && (
              <Image
                source={require("../assets/verified.png")}
                style={styles.verificationIcon}
              />
            )}
          </View>
          <Text style={styles.username}>@{actor.data.username}</Text>
        </View>
        <FollowButton isFollowing={false} onToggleFollow={toggleFollow} />
      </TouchableOpacity>

      <View style={styles.contentSection}>
        {object.data?.text && (
          <Text style={styles.text}>{object.data.text}</Text>
        )}
        <SparkleImage images={images} />
        {isAQuote && quoted_activity && (
          <EmbeddedSparkle activity={quoted_activity} />
        )}
        <Text style={styles.timestamp}>{getThreadTime(time)}</Text>
      </View>

      <View style={styles.reactionsSection}>
        <Text style={styles.reaction}>
          {likesCount} Like{likesCount === 1 ? "" : "s"}
        </Text>
        <Text style={styles.reaction}>
          {commentsCount} Comment{commentsCount === 1 ? "" : "s"}
        </Text>
        <Text style={styles.reaction}>
          {resparklesCount} Resparkle{resparklesCount === 1 ? "" : "s"}
        </Text>
      </View>

      <View style={styles.iconsSection}>
        {reactions.map(({ id, Icon, onClick }) => (
          <TouchableOpacity
            key={id}
            onPress={onClick}
            style={styles.reactionButton}
          >
            <Icon
              color={getColor(id)}
              size={20}
              fill={id === "like" && hasLikedSparkle}
            />
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.commentSection}>
        {/* TODO: show the current user's profile image */}
        <Image
          source={{ uri: actor.data.profileImage }}
          style={styles.commentProfileImage}
        />
        <TextInput
          style={styles.commentInput}
          placeholder="Write a comment..."
          placeholderTextColor={colors.medium}
          value={comment}
          onChangeText={setComment}
        />
        <TouchableOpacity
          style={[
            styles.commentButton,
            { backgroundColor: comment ? colors.blue : colors.light },
          ]}
          onPress={handleCommentSubmit}
          disabled={!comment}
        >
          <Text style={styles.commentButtonText}>Comment</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={comments}
        keyExtractor={(comment) => comment.id}
        ItemSeparatorComponent={ItemSeparator}
        renderItem={({ item }) => <CommentBlock {...item} />}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
  },
  profileSection: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
  },
  profileImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  profileDetails: {
    flex: 1,
  },
  nameRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  name: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
  verificationIcon: {
    width: 16,
    height: 16,
    marginLeft: 5,
  },
  username: {
    fontSize: 14,
    color: colors.primary,
  },
  contentSection: {
    padding: 15,
    paddingTop: 0,
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: colors.medium,
    marginBottom: 5,
  },
  timestamp: {
    fontSize: 12,
    color: colors.medium,
  },
  reactionsSection: {
    borderBottomColor: colors.light,
    borderBottomWidth: 2,
    flexDirection: "row",
    justifyContent: "space-around",
    borderTopColor: colors.light,
    borderTopWidth: 1,
    paddingVertical: 10,
  },
  iconsSection: {
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 10,
  },
  reaction: {
    fontSize: 14,
    color: "#657786",
  },
  reactionButton: {
    alignItems: "center",
    flex: 1,
  },
  commentSection: {
    alignItems: "center",
    borderBottomColor: colors.light,
    borderBottomWidth: 1,
    borderTopColor: colors.light,
    borderTopWidth: 1,
    flexDirection: "row",
    paddingHorizontal: 10,
    paddingVertical: 15,
  },
  commentProfileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 10,
  },
  commentInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 5,
    paddingHorizontal: 10,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: colors.light,
    color: colors.dark,
    marginRight: 10,
  },
  commentButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
  },
  commentButtonText: {
    fontSize: 14,
    fontWeight: "bold",
    color: colors.white,
  },
});
