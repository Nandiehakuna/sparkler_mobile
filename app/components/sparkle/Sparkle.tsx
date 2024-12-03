import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { NavigationProp } from "@react-navigation/native";
import { Activity } from "getstream";

import { ActorName, EmbeddedSparkle, SparkleImage, ResparkleOptions } from ".";
import { CommentIcon, LikeIcon, ResparkleIcon, UploadIcon } from "../icons";
import { routes } from "../../navigation";
import { SparkleActivity } from "../../utils/types";
import { useLike, useSparkle, useUser } from "../../hooks";
import colors from "../../config/colors";
import Text from "../Text";

type ReactionId = "comment" | "resparkle" | "like" | "upload";

export type Reaction = {
  id: ReactionId;
  Icon: JSX.Element;
  value?: number;
  onClick: () => void;
};

export const MAX_NO_OF_LINES = 4;

interface Props {
  activity: Activity;
  navigation: NavigationProp<any>;
  onlyShowMedia?: boolean;
}

export default ({ activity, navigation, onlyShowMedia }: Props) => {
  const [showResparkleOptions, setShowResparkleOptions] = useState(false);
  const [hasResparkled, setHasResparkled] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [resparkleCount, setResparkleCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const { checkIfHasLiked, checkIfHasResparkled } = useSparkle();
  const { toggleLike } = useLike();
  const { user } = useUser();

  const isAReaction = activity.foreign_id.startsWith("reaction");
  const originalSparkleActivity = isAReaction
    ? (activity.object as unknown as SparkleActivity)
    : (activity as unknown as SparkleActivity);
  const { actor, object, time, quoted_activity, attachments, reaction_counts } =
    originalSparkleActivity;
  const isAQuote = activity.verb === "quote";
  const appActivity = activity as unknown as SparkleActivity;
  const images: string[] = attachments?.images || [];

  useEffect(() => {
    setHasResparkled(checkIfHasResparkled(appActivity));
    setHasLiked(checkIfHasLiked(appActivity));
    setResparkleCount(reaction_counts?.resparkle || 0);
    setLikeCount(reaction_counts?.like || 0);
  }, []);

  const reactions: Reaction[] = [
    {
      id: "comment",
      Icon: <CommentIcon size={23} />,
      value: reaction_counts?.comment || 0,
      onClick: () => {},
    },
    {
      id: "resparkle",
      Icon: <ResparkleIcon size={22} resparkled={hasResparkled} />,
      value: resparkleCount,
      onClick: () => setShowResparkleOptions(true),
    },
    {
      id: "like",
      Icon: <LikeIcon liked={hasLiked} size={18} />,
      value: likeCount,
      onClick: handleLikeToggle,
    },
    {
      id: "upload",
      Icon: <UploadIcon size={18} />,
      onClick: () => {},
    },
  ];

  const getResparklerName = (): string => {
    const { actor } = activity as unknown as SparkleActivity;
    const isSparkler = user?._id === actor.id || hasResparkled;
    const actorName = actor.data.name;

    return isSparkler ? "You" : actorName;
  };

  const visitProfile = () => navigation.navigate(routes.PROFILE, actor);

  const viewThread = () =>
    navigation.navigate(routes.THREAD, originalSparkleActivity);

  function getColor(id: ReactionId): string {
    let color = colors.medium;

    if (id === "like" && hasLiked) color = colors.primary;
    else if (id === "resparkle" && hasResparkled) color = "#17BF63";

    return color;
  }

  const toggleResparkle = (resparkled: boolean) => {
    setHasResparkled(resparkled);

    let count = resparkleCount;
    setResparkleCount(resparkled ? (count += 1) : (count -= 1));
  };

  async function handleLikeToggle() {
    const liked = hasLiked;
    let count = likeCount;
    setLikeCount(hasLiked ? (count -= 1) : (count += 1));
    setHasLiked(!hasLiked);

    const res = await toggleLike(activity, liked);
    if (!res?.ok) {
      setLikeCount(count);
      console.log("Error toggling like");
    }
  }

  if (onlyShowMedia && !images.length) return null;

  return (
    <TouchableOpacity onPress={viewThread}>
      {(isAReaction || hasResparkled) && (
        <View style={styles.resparkleSection}>
          <ResparkleIcon resparkled={false} size={18} />
          <Text style={styles.resparkleText}>
            <Text style={styles.resparklerName}>{getResparklerName()}</Text>{" "}
            resparkled
          </Text>
        </View>
      )}

      <View style={styles.detailsContainer}>
        {/* Don't remove this View it ensures we visit the profile only when the image is clicked and not around it */}
        <View>
          <TouchableOpacity onPress={visitProfile}>
            <Image
              source={{ uri: actor.data.profileImage }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>
        <View style={styles.contentContainer}>
          <ActorName actor={actor} time={time} onPress={visitProfile} />

          <Text style={styles.text} numberOfLines={MAX_NO_OF_LINES}>
            {object.data?.text}
          </Text>

          {Boolean(object.data?.text) && (
            <TouchableOpacity onPress={viewThread}>
              <Text style={styles.readMore}>Read more</Text>
            </TouchableOpacity>
          )}

          <SparkleImage images={images} />

          {isAQuote && quoted_activity && (
            <EmbeddedSparkle
              activity={quoted_activity}
              navigation={navigation}
            />
          )}

          <View style={styles.reactionsContainer}>
            {reactions.map(({ id, Icon, value, onClick }, index) => (
              <TouchableOpacity
                key={index}
                style={styles.reactionButton}
                onPress={onClick}
              >
                {Icon}
                {Boolean(value) && (
                  <Text style={[styles.reactionCount, { color: getColor(id) }]}>
                    {value}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>

      <ResparkleOptions
        activity={activity}
        onClose={() => setShowResparkleOptions(false)}
        hasResparkled={hasResparkled}
        visible={showResparkleOptions}
        ontoggleResparkle={toggleResparkle}
      />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  resparkleSection: {
    alignItems: "center",
    flexDirection: "row",
    marginLeft: 45,
    paddingTop: 5,
  },
  resparkleText: {
    fontSize: 14,
    color: colors.medium,
    marginLeft: 5,
    fontWeight: "500",
  },
  resparklerName: {
    fontWeight: "bold",
    color: colors.medium,
  },
  detailsContainer: {
    flexDirection: "row",
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: colors.light,
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
  },
  text: {
    fontSize: 15,
    color: colors.medium,
    letterSpacing: 0.1,
    lineHeight: 20,
    flexWrap: "wrap",
    overflow: "hidden",
    width: "100%",
  },
  readMore: {
    fontSize: 14,
    color: colors.blue,
    marginTop: 4,
    fontWeight: "500",
  },
  reactionsContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 8,
  },
  reactionButton: {
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 10,
  },
  reactionCount: {
    marginLeft: 4,
    fontSize: 14,
  },
});
