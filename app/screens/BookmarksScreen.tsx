import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Activity } from 'getstream';

import { ActivityIndicator, Sparkle, Text } from '../components';
import { SparkleActivity } from '../utils/types';
import { useBookmark, useTheme, useUser } from '../hooks';
import colors from '../config/colors';

export default () => {
  const [loading, setIsLoading] = useState(false);
  const [bookmarks, setBookmarks] = useState<SparkleActivity[]>([]);
  const { getBookmarkedSparkles } = useBookmark();
  const { theme } = useTheme();
  const { user } = useUser();

  useEffect(() => {
    async function initBookmarks() {
      if (user) {
        setIsLoading(true);
        setBookmarks(await getBookmarkedSparkles());
        setIsLoading(false);
      }
    }

    initBookmarks();
  }, []);

  return (
    <View style={{ backgroundColor: theme.colors.background, flex: 1 }}>
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
    </View>
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
