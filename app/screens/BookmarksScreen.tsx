import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Activity } from 'getstream';

import { Sparkle, Text } from '../components';
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
    <View style={styles.container}>
      <Text isBold style={styles.title}>
        Bookmarks
      </Text>
      <FlatList
        data={bookmarks || []}
        keyExtractor={(bookmark) => bookmark.id}
        renderItem={({ item }) => <Sparkle activity={item as unknown as Activity} />}
      />
    </View>
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
    marginBottom: 15,
  },
});
