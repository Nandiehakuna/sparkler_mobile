import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Activity } from 'getstream';

import { FloatingButton, SearchInput, Sparkle } from '../components';
import { routes } from '../navigation';
import { ScreenProps } from '../utils/types';
import { useHashtags, useTheme } from '../hooks';

export default ({ route, navigation }: ScreenProps) => {
  const { hashtag } = route.params;
  const [tag, setTag] = useState(`"${hashtag}"`);
  const { getSparklesOfHashtag } = useHashtags();
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.inputContainer}>
        <SearchInput searchQuery={tag} onSearchQueryChange={setTag} placeholder="Search Hashtags" />
      </View>

      <FloatingButton onPress={() => navigation.navigate(routes.NEW_SPARKLE)} />

      <FlatList
        data={getSparklesOfHashtag(tag.replaceAll('"', ''))}
        keyExtractor={(sparkle) => sparkle.id}
        renderItem={({ item: sparkle }) => <Sparkle activity={sparkle as unknown as Activity} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    position: 'relative',
  },
  inputContainer: {
    padding: 15,
    paddingBottom: 3,
  },
});
