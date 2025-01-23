import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Activity } from 'getstream';

import { ActivityIndicator, AppRefreshControl, RetryButton, Sparkle, Text } from '../components';
import { SparkleActivity } from '../utils/types';
import { useBookmark, useTheme, useUser } from '../hooks';

export default () => {
  const [loading, setIsLoading] = useState(false);
  const [errorOccurred, setErrorOccured] = useState(false);
  const [bookmarks, setBookmarks] = useState<SparkleActivity[]>([]);
  const { getBookmarkedSparkles } = useBookmark();
  const { theme } = useTheme();
  const { user } = useUser();

  useEffect(() => {
    initBookmarks();
  }, [errorOccurred]);

  async function initBookmarks() {
    try {
      if (!user) return;
      setErrorOccured(false);

      setIsLoading(true);
      setBookmarks(await getBookmarkedSparkles());
      setIsLoading(false);
    } catch (error) {
      setErrorOccured(true);
    }
  }

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
          refreshControl={<AppRefreshControl onRefresh={initBookmarks} />}
          ListHeaderComponent={<RetryButton onPress={initBookmarks} visible={errorOccurred} />}
          style={styles.container}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
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
