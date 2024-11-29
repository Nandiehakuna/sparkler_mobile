import React from "react";
import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { ActivityProps } from "expo-activity-feed";
import { useNavigation } from "@react-navigation/native";
import { AntDesign } from "@expo/vector-icons";

import { ActorName, EmbeddedSparkle, SparkleImage } from ".";
import { Comment, Heart, Resparkle } from "../../assets/icons";
import { routes } from "../../navigation";
import { SparkleActivity } from "../../utils/types";
import { useSparkle } from "../../hooks";
import colors from "../../config/colors";

export type IconType = (props: {
  color: string;
  size?: number;
  fill?: boolean;
}) => JSX.Element;

export type ReactionId = "comment" | "resparkle" | "like" | "upload";

export type Reaction = {
  id: ReactionId;
  Icon: IconType;
  value?: number;
  onClick: () => void;
};

export const MAX_NO_OF_LINES = 4;

export default ({ activity }: ActivityProps) => {
  const { checkIfHasLiked, checkIfHasResparkled } = useSparkle();
  const navigation = useNavigation();

  const user = { _id: "", id: "" };
  const isAReaction = activity.foreign_id.startsWith("reaction");
  const originalSparkleActivity = isAReaction
    ? (activity.object as unknown as SparkleActivity)
    : (activity as unknown as SparkleActivity);
  const { actor, object, time, quoted_activity, attachments, reaction_counts } =
    originalSparkleActivity;
  const isAQuote = activity.verb === "quote";
  const hasResparkled = checkIfHasResparkled(activity);
  const hasLikedSparkle = checkIfHasLiked(activity);
  const images: string[] = attachments?.images || [];

  const reactions: Reaction[] = [
    {
      id: "comment",
      Icon: Comment,
      value: reaction_counts?.comment || 0,
      onClick: () => {},
    },
    {
      id: "resparkle",
      Icon: Resparkle,
      value: reaction_counts?.resparkle || 0,
      onClick: () => {},
    },
    {
      id: "like",
      Icon: Heart,
      value: reaction_counts?.like || 0,
      onClick: () => {},
    },
    {
      id: "upload",
      Icon: () => <AntDesign name="upload" size={18} color={colors.medium} />,
      onClick: () => {},
    },
  ];

  const getResparklerName = (): string => {
    const { actor } = activity as unknown as SparkleActivity;
    const isSparkler = user?.id === actor.id || hasResparkled;
    const actorName = actor.data.name;

    return isSparkler ? "You" : actorName;
  };

  const visitProfile = () => navigation.navigate(routes.PROFILE, actor);

  const viewThread = () =>
    navigation.navigate(routes.THREAD, originalSparkleActivity);

  const getColor = (id: ReactionId): string => {
    let color = colors.medium;

    if (id === "like" && hasLikedSparkle) color = colors.primary;
    else if (id === "resparkle" && hasResparkled) color = "#17BF63";

    return color;
  };

  return (
    <TouchableOpacity onPress={viewThread}>
      {(isAReaction || hasResparkled) && (
        <View style={styles.resparkleSection}>
          <Resparkle color={colors.medium} size={14} />
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
            <EmbeddedSparkle activity={quoted_activity} />
          )}
          <View style={styles.reactionsContainer}>
            {reactions.map(({ id, Icon, value, onClick }, index) => (
              <TouchableOpacity
                key={index}
                style={styles.reactionButton}
                onPress={onClick}
              >
                <Icon
                  color={getColor(id)}
                  size={20}
                  fill={id === "like" && hasLikedSparkle}
                />
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
    borderBottomColor: "#ddd",
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
