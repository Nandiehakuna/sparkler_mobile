import React, { useState } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";

import { ActorName } from "../sparkle";
import { Comment } from "../../utils/types";
import { MAX_NO_OF_LINES } from "../sparkle/Sparkle";
import colors from "../../config/colors";

export default ({ user, data, created_at }: Comment) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isTruncated, setIsTruncated] = useState(false);

  const visitProfile = () => {};

  const handleTextLayout = (e: any) => {
    const { lines } = e.nativeEvent;
    if (lines.length > MAX_NO_OF_LINES) setIsTruncated(true);
  };

  return (
    <View style={styles.container}>
      {/* Don't remove this View it ensures we visit the profile only when the image is clicked and not around it */}
      <View>
        <TouchableOpacity onPress={visitProfile}>
          <Image
            source={{ uri: user.data.profileImage }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <View style={styles.contentContainer}>
        <ActorName actor={user} time={created_at} onPress={visitProfile} />

        <Text
          style={styles.text}
          numberOfLines={isExpanded ? undefined : MAX_NO_OF_LINES}
          onTextLayout={handleTextLayout}
        >
          {data?.text}
        </Text>

        {isTruncated && (
          <TouchableOpacity onPress={() => setIsExpanded(!isExpanded)}>
            <Text style={styles.readMore}>
              {isExpanded ? "Show less" : "Read more"}
            </Text>
          </TouchableOpacity>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 10,
  },
  contentContainer: {
    flex: 1,
    flexDirection: "column",
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginRight: 8,
  },
  readMore: {
    fontSize: 14,
    color: colors.blue,
    marginTop: 4,
    fontWeight: "500",
  },
  text: {
    fontSize: 15,
    color: colors.medium,
    lineHeight: 20,
    flexWrap: "wrap",
    overflow: "hidden",
    width: "100%",
  },
});
