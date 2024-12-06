import React, { useState } from "react";
import {
  FlatList,
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
} from "react-native";
import FontAwesome from "@expo/vector-icons/FontAwesome";

import { routes } from "../navigation";
import { SearchInput } from "../components";
import { useHashtags, useNavigation } from "../hooks";
import colors from "../config/colors";

export default () => {
  const [query, setQuery] = useState("");
  const { hashtags } = useHashtags();
  const navigation = useNavigation();

  const viewSparklesOfHashtag = (hashtag: string) => {
    navigation.navigate(routes.HASHTAG, { hashtag });
  };

  return (
    <View style={styles.container}>
      <SearchInput
        placeholder="Search Hashtags"
        onSearchQueryChange={setQuery}
        searchQuery={query}
      />

      <FlatList
        data={Object.entries(hashtags)}
        keyExtractor={([tag]) => tag}
        renderItem={({ item: [tag, count] }) => (
          <TouchableOpacity
            style={styles.hashtagItem}
            onPress={() => viewSparklesOfHashtag(tag)}
          >
            <View>
              <Text style={styles.hashtagText}>#{tag}</Text>
              <Text>
                {count} Sparkle{count === 1 ? "" : "s"}
              </Text>
            </View>
            <FontAwesome name="chevron-right" size={14} color={colors.medium} />
          </TouchableOpacity>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f9f9f9",
    paddingHorizontal: 20,
    paddingTop: 10,
  },

  hashtagItem: {
    alignItems: "center",
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 1,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 10,
    padding: 15,
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  hashtagText: {
    color: colors.blue,
    fontSize: 16,
    fontWeight: "600",
  },
});
