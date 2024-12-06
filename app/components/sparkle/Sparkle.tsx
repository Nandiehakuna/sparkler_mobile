import React, { useEffect, useState } from "react";
import { Image, StyleSheet, View, TouchableOpacity } from "react-native";
import { Activity } from "getstream";

import {
  ActorName,
  EmbeddedSparkle,
  SparkleImage,
  ResparkleOptions,
  ShareSparkleOptions,
  SparkleActionsModal,
} from ".";
import { appUrl } from "../../services/client";
import { CommentIcon, LikeIcon, ResparkleIcon, UploadIcon } from "../icons";
import { routes } from "../../navigation";
import { SparkleActivity } from "../../utils/types";
import {
  useLike,
  useUser,
  useNavigation,
  useProfileUser,
  useSparkle,
} from "../../hooks";
import { generateSparkleLink } from "../../utils/funcs";
import colors from "../../config/colors";
import Text from "../Text";

type ReactionId = "comment" | "resparkle" | "like" | "upload";

export type Reaction = {
  id: ReactionId;
  Icon: JSX.Element;
  value?: number;
  onPress: () => void;
};

export const MAX_NO_OF_LINES = 4;

interface Props {
  activity: Activity;
  onlyShowMedia?: boolean;
}

export default ({ activity, onlyShowMedia }: Props) => {
  const [showResparkleOptions, setShowResparkleOptions] = useState(false);
  const [hasResparkled, setHasResparkled] = useState(false);
  const [showShareOptions, setShowShareOptions] = useState(false);
  const [showSparkleActions, setShowSparkleActions] = useState(false);
  const [hasLiked, setHasLiked] = useState(false);
  const [resparkleCount, setResparkleCount] = useState(0);
  const [likeCount, setLikeCount] = useState(0);
  const { checkIfHasLiked, checkIfHasResparkled } = useSparkle();
  const { toggleLike } = useLike();
  const { user } = useUser();
  const { viewProfile } = useProfileUser();
  const navigation = useNavigation();

  const isAReaction = activity.foreign_id.startsWith("reaction");
  const originalSparkleActivity = isAReaction
    ? (activity.object as unknown as SparkleActivity)
    : (activity as unknown as SparkleActivity);
  const { actor, object, time, quoted_activity, attachments, reaction_counts } =
    originalSparkleActivity;
  const isAQuote = activity.verb === "quote";
  const appActivity = activity as unknown as SparkleActivity;
  const images: string[] = attachments?.images || [];
  const text: string = (object?.data || { text: "" }).text;
  const sparkleLink = generateSparkleLink(actor.data.username, appActivity.id);

  useEffect(() => {
    setHasResparkled(checkIfHasResparkled(appActivity));
    setHasLiked(checkIfHasLiked(appActivity));
    setResparkleCount(reaction_counts?.resparkle || 0);
    setLikeCount(reaction_counts?.like || 0);
  }, []);

  const reactions: Reaction[] = [
    {
      id: "comment",
      Icon: <CommentIcon size={18} />,
      value: reaction_counts?.comment || 0,
      onPress: () => {},
    },
    {
      id: "resparkle",
      Icon: <ResparkleIcon resparkled={hasResparkled} />,
      value: resparkleCount,
      onPress: () => setShowResparkleOptions(true),
    },
    {
      id: "like",
      Icon: <LikeIcon liked={hasLiked} />,
      value: likeCount,
      onPress: handleLikeToggle,
    },
    {
      id: "upload",
      Icon: <UploadIcon />,
      onPress: () => setShowShareOptions(true),
    },
  ];

  const getResparklerName = (): string => {
    const { actor } = activity as unknown as SparkleActivity;
    const isSparkler = user?._id === actor.id || hasResparkled;
    const actorName = actor.data.name;

    return isSparkler ? "You" : actorName;
  };

  const visitProfile = () => viewProfile(actor);

  const viewThread = () =>
    navigation.navigate(routes.THREAD, originalSparkleActivity);

  function getColor(id: ReactionId): string {
    let color: string = colors.medium;

    if (id === "like" && hasLiked) color = colors.primary;
    else if (id === "resparkle" && hasResparkled) color = colors.green;

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
          <ActorName
            actor={actor}
            onMoreIconPress={() => setShowSparkleActions(true)}
            onPress={visitProfile}
            showMoreIcon
            time={time}
          />
          <View style={styles.actorNameContainer}></View>

          <Text style={styles.text} numberOfLines={MAX_NO_OF_LINES}>
            {text}
          </Text>

          {Boolean(text.length) && (
            <TouchableOpacity onPress={viewThread}>
              <Text style={styles.readMore}>Read more</Text>
            </TouchableOpacity>
          )}

          <SparkleImage images={images} />

          {isAQuote && quoted_activity && (
            <EmbeddedSparkle activity={quoted_activity} />
          )}

          <View style={styles.reactionsContainer}>
            {reactions.map(({ id, Icon, value, onPress }, index) => (
              <TouchableOpacity
                key={index}
                style={styles.reactionButton}
                onPress={onPress}
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

      <SparkleActionsModal
        onClose={() => setShowSparkleActions(false)}
        visible={showSparkleActions}
        actorId={actor.id}
        sparkleId={activity.id}
      />

      <ShareSparkleOptions
        onClose={() => setShowShareOptions(false)}
        isOpen={showShareOptions}
        sparkleUrl={`${appUrl}${sparkleLink}`}
        text={text}
      />

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
  actorNameContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
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
    alignItems: "flex-start",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 10,
  },
  contentContainer: {
    flex: 1,
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
    justifyContent: "space-between",
    marginTop: 10,
  },
  reactionButton: {
    flexDirection: "row",
    alignItems: "center",
    // paddingHorizontal: 10,
  },
  reactionCount: {
    marginLeft: 5,
    fontSize: 14,
  },
});
