import React, { useEffect, useState } from "react";
import {
  Image,
  ScrollView,
  StyleSheet,
  View,
  TextInput,
  TouchableOpacity,
  FlatList,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import {
  CommentIcon,
  LikeIcon,
  ResparkleIcon,
  UploadIcon,
} from "../components/icons";
import {
  EmbeddedSparkle,
  SparkleImage,
  ResparkleOptions,
} from "../components/sparkle";
import { Comment as CommentBlock, FollowButton } from "../components/thread";
import { ItemSeparator, Text } from "../components";
import { getThreadTime } from "../utils/time";
import { Reaction } from "../components/sparkle/Sparkle";
import { routes } from "../navigation";
import { Comment, ScreenProps, SparkleActivity } from "../utils/types";
import { useComment, useLike, useSparkle, useUser } from "../hooks";
import colors from "../config/colors";

export default ({ navigation, route }: ScreenProps) => {
  const [comment, setComment] = useState("");
  const [hasLiked, setHasLiked] = useState(false);
  const [hasResparkled, setHasResparkled] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [resparkleCount, setResparkleCount] = useState(0);
  const [commentCount, setCommentCount] = useState(0);
  const [showResparkleOptions, setShowResparkleOptions] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const { checkIfHasLiked, checkIfHasResparkled } = useSparkle();
  const { toggleLike } = useLike();
  const { user } = useUser();
  const commentHandler = useComment();

  const sparkle: SparkleActivity | undefined = route.params as SparkleActivity;

  useEffect(() => {
    if (!sparkle) return;

    setHasResparkled(checkIfHasResparkled(sparkle));
    setResparkleCount(reaction_counts?.resparkle || 0);
    setLikeCount(reaction_counts?.like || 0);
    setCommentCount(reaction_counts?.comment || 0);
    setComments(latest_reactions?.comment || []);
    setHasLiked(checkIfHasLiked(sparkle));
  }, []);

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
  const quotesCount = reaction_counts?.quote || 0;
  const images: string[] = attachments?.images || [];

  const reactions: Reaction[] = [
    {
      id: "comment",
      Icon: <CommentIcon size={22} />,
      value: commentCount,
      onClick: () => {},
    },
    {
      id: "resparkle",
      Icon: <ResparkleIcon resparkled={hasResparkled} size={22} />,
      value: resparkleCount,
      onClick: () => setShowResparkleOptions(true),
    },
    {
      id: "like",
      Icon: <LikeIcon liked={hasLiked} size={22} />,
      value: likeCount,
      onClick: handleLikeToggle,
    },
    {
      id: "upload",
      Icon: <UploadIcon size={20} />,
      onClick: () => {},
    },
  ];

  const toggleResparkle = (resparkled: boolean) => {
    setHasResparkled(resparkled);

    let count = resparkleCount;
    setResparkleCount(resparkled ? (count += 1) : (count -= 1));
  };

  const handleComment = async () => {
    if (!comment || !user) return;

    const res = await commentHandler.handleComment(sparkle, comment);
    if (!res) {
      console.log("Error commenting", res);
    } else {
      setComments([res as unknown as Comment, ...comments]);
    }
  };

  async function handleLikeToggle() {
    if (!sparkle) return;

    const liked = hasLiked;
    let count = likeCount;
    setLikeCount(hasLiked ? (count -= 1) : (count += 1));
    setHasLiked(!hasLiked);

    const res = await toggleLike(sparkle, liked);
    if (!res?.ok) {
      setLikeCount(count);
      console.log("Error toggling like");
    }
  }

  const visitProfile = () => navigation.navigate(routes.PROFILE, actor);

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
        <FollowButton userId={actor.id} />
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
          {likeCount} Like{likeCount === 1 ? "" : "s"}
        </Text>
        <Text style={styles.reaction}>
          {commentCount} Comment{commentCount === 1 ? "" : "s"}
        </Text>
        <Text style={styles.reaction}>
          {resparkleCount} Resparkle{resparkleCount === 1 ? "" : "s"}
        </Text>
        <Text style={styles.reaction}>
          {quotesCount} Quote{quotesCount === 1 ? "" : "s"}
        </Text>
      </View>

      <View style={styles.iconsSection}>
        {reactions.map(({ id, Icon, onClick }) => (
          <TouchableOpacity
            key={id}
            onPress={onClick}
            style={styles.reactionButton}
          >
            {Icon}
          </TouchableOpacity>
        ))}
      </View>

      <View style={styles.commentSection}>
        <View style={styles.commentProfileImage}>
          {user?.profileImage ? (
            <Image source={{ uri: user?.profileImage }} />
          ) : (
            <FontAwesome name="user-circle" size={20} color={colors.medium} />
          )}
        </View>
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
          onPress={handleComment}
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

      <ResparkleOptions
        activity={sparkle}
        hasResparkled={hasResparkled}
        onClose={() => setShowResparkleOptions(false)}
        ontoggleResparkle={toggleResparkle}
        visible={showResparkleOptions}
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
