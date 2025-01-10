import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Activity } from 'getstream';

import { ActivityIndicator, Sparkle, Text } from '../components';
import { SparkleActivity } from '../utils/types';
import { useBookmark } from '../hooks';
import colors from '../config/colors';

export default () => {
  const [loading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<SparkleActivity[]>([]);
  const { getBookmarkedSparkles } = useBookmark();

  useEffect(() => {
    async function initBookmarks() {
      setIsLoading(true);
      setBookmarks(await getBookmarkedSparkles());
      setIsLoading(false);
    }

    initBookmarks();
  }, []);

  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={styles.container}>
        <Text isBold style={styles.title}>
          Bookmarks
        </Text>
        {!bookmarks.length && !loading && (
          <Text style={styles.text}>You don't have any bookmarks yet</Text>
        )}
        <FlatList
          data={bookmarks || []}
          keyExtractor={(bookmark) => bookmark.id}
          renderItem={({ item }) => <Sparkle activity={item as unknown as Activity} />}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.white,
    flex: 1,
  },
  text: {
    marginTop: 30,
    textAlign: 'center',
  },
  title: {
    textAlign: 'center',
    fontSize: 24,
    marginBottom: 15,
    marginTop: 7,
  },
});
