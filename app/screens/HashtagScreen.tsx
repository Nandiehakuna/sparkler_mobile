import React, { useState } from "react";
import { FlatList, StyleSheet, ScrollView, View } from "react-native";
import { Activity } from "getstream";

import { ScreenProps } from "../utils/types";
import { SearchInput, Sparkle } from "../components";
import { useHashtags } from "../hooks";
import colors from "../config/colors";

export default ({ route }: ScreenProps) => {
  const { getSparklesOfHashtag } = useHashtags();
  const { hashtag } = route.params;
  const [tag, setTag] = useState(`"${hashtag}"`);

  return (
    <ScrollView style={styles.container}>
      <View style={styles.inputContainer}>
        <SearchInput
          searchQuery={tag}
          onSearchQueryChange={setTag}
          placeholder="Search Hashtags"
        />
      </View>

      <FlatList
        data={getSparklesOfHashtag(tag.replaceAll('"', ""))}
        keyExtractor={(sparkle) => sparkle.id}
        renderItem={({ item: sparkle }) => (
          <Sparkle activity={sparkle as unknown as Activity} />
        )}
      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  inputContainer: {
    padding: 15,
    paddingBottom: 3,
  },
});
