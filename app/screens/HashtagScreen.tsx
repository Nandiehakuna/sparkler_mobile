import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";
import { Activity } from "getstream";

import { FloatingButton, SearchInput, Sparkle } from "../components";
import { routes } from "../navigation";
import { ScreenProps } from "../utils/types";
import { useHashtags } from "../hooks";
import colors from "../config/colors";

export default ({ route, navigation }: ScreenProps) => {
  const { getSparklesOfHashtag } = useHashtags();
  const { hashtag } = route.params;
  const [tag, setTag] = useState(`"${hashtag}"`);

  return (
    <View style={styles.container}>
      <View style={styles.inputContainer}>
        <SearchInput
          searchQuery={tag}
          onSearchQueryChange={setTag}
          placeholder="Search Hashtags"
        />
      </View>

      <FloatingButton onPress={() => navigation.navigate(routes.NEW_SPARKLE)} />

      <FlatList
        data={getSparklesOfHashtag(tag.replaceAll('"', ""))}
        keyExtractor={(sparkle) => sparkle.id}
        renderItem={({ item: sparkle }) => (
          <Sparkle activity={sparkle as unknown as Activity} />
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
    position: "relative",
  },
  inputContainer: {
    padding: 15,
    paddingBottom: 3,
  },
});
