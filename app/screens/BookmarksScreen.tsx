import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';
import { Activity } from 'getstream';

import { ActivityIndicator, Sparkle, Text } from '../components';
import { Comment } from '../components/thread';
import { Comment as CommentType, SparkleActivity } from '../utils/types';
import { useBookmark, useTheme, useUser } from '../hooks';

export default () => {
  const [loading, setIsLoading] = useState(false);
  const [activities, setActivities] = useState<Array<CommentType | SparkleActivity>>([]);
  const { getBookmarkedSparkles } = useBookmark();
  const { theme } = useTheme();
  const { user } = useUser();

  useEffect(() => {
    async function initBookmarks() {
      try {
        if (user) {
          setIsLoading(true);
          setActivities(await getBookmarkedSparkles());
          setIsLoading(false);
        }
      } catch (error) {}
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
        {!activities.length && !loading && (
          <Text style={styles.text}>You don't have any bookmarks yet</Text>
        )}
        <FlatList
          data={activities || []}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) =>
            item.parent ? (
              <Comment {...(item as CommentType)} parentUsername="" />
            ) : (
              <Sparkle activity={item as unknown as Activity} />
            )
          }
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
