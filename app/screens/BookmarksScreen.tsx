import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Activity } from 'getstream';

import { Screen, Sparkle, Text } from '../components';
import { SparkleActivity } from '../utils/types';
import { useBookmark } from '../hooks';
import colors from '../config/colors';

export default () => {
  const [bookmarks, setBookmarks] = useState<SparkleActivity[]>([]);
  const { getBookmarkedSparkles } = useBookmark();

  useEffect(() => {
    async function initBookmarks() {
      setBookmarks(await getBookmarkedSparkles());
    }

    initBookmarks();
  }, []);

  return (
    <Screen style={styles.container}>
      <Text style={styles.title}>Bookmarks</Text>
      <FlatList
        data={bookmarks || []}
        keyExtractor={(bookmark) => bookmark.id}
        renderItem={({ item }) => (
          <Sparkle activity={item as unknown as Activity} />
        )}
      />
    </Screen>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    fontWeight: '600',
    marginBottom: 15,
  },
});
