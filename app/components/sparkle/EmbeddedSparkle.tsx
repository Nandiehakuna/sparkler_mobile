import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import { useNavigation } from "@react-navigation/native";

import { ActorName } from "../sparkle";
import { routes } from "../../navigation";
import { SparkleActivity } from "../../utils/types";
import colors from "../../config/colors";

interface ReactionCounts {
  comment?: number;
  like?: number;
  resparkle?: number;
  quote?: number;
}

interface Props {
  activity: SparkleActivity;
}

const EmbeddedSparkleBlock: React.FC<Props> = ({ activity }) => {
  const navigation = useNavigation();

  const actor = activity.actor;
  const sparkle = activity.object.data;
  const reactionCounts: ReactionCounts = activity.reaction_counts || {};
  const { comment = 0, like = 0, resparkle = 0, quote = 0 } = reactionCounts;

  const viewThread = () => navigation.navigate(routes.THREAD, activity);

  const viewProfile = () => {};

  return (
    <View style={styles.embeddedBlock}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.embeddedUserImage}
          onPress={viewProfile}
        >
          <Image
            source={{ uri: actor.data?.profileImage }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
        <View style={styles.actorNameContainer}>
          <ActorName actor={actor} time={activity.time} onPress={viewProfile} />
        </View>
      </View>

      <TouchableOpacity style={styles.tweetDetails} onPress={viewThread}>
        <Text style={styles.text} numberOfLines={4}>
          {sparkle?.text}
        </Text>
      </TouchableOpacity>

      <View style={styles.reactionCountsComp}>
        {comment > 0 && (
          <Text style={styles.reactionText}>
            {comment} Comment{comment > 1 ? "s" : ""}
          </Text>
        )}
        {like > 0 && (
          <Text style={styles.reactionText}>
            {like} Like{like > 1 ? "s" : ""}
          </Text>
        )}
        {resparkle > 0 && (
          <Text style={styles.reactionText}>
            {resparkle} Resparkle{resparkle > 1 ? "s" : ""}
          </Text>
        )}
        {quote > 0 && (
          <Text style={styles.reactionText}>
            {quote} Quote{quote > 1 ? "s" : ""}
          </Text>
        )}
      </View>
    </View>
  );
};

export default EmbeddedSparkleBlock;

const styles = StyleSheet.create({
  embeddedBlock: {
    backgroundColor: "inherit",
    borderColor: colors.light,
    borderRadius: 8,
    borderWidth: 0.5,
    marginVertical: 5,
    padding: 7,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    fontSize: 12,
    width: "100%",
  },
  embeddedUserImage: {
    width: 18,
    height: 18,
    borderRadius: 50,
    overflow: "hidden",
    marginRight: 5,
  },
  profileImage: {
    borderRadius: "100%",
    width: "100%",
    height: "100%",
    resizeMode: "cover",
  },
  actorNameContainer: {
    flex: 1,
    flexShrink: 1,
    marginLeft: 5,
  },
  time: {
    color: colors.medium,
    fontSize: 10,
    marginLeft: 10,
    alignSelf: "flex-end",
  },
  tweetDetails: {
    marginTop: 5,
  },
  text: {
    color: colors.medium,
    fontSize: 14,
    lineHeight: 20,
    marginTop: 3,
    width: "100%",
  },
  reactionCountsComp: {
    marginTop: 1,
    fontSize: 12,
    color: "#aaa",
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10,
  },
  reactionText: {
    color: "#aaa",
  },
});
