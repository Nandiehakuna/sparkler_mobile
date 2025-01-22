import { useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity, RefreshControl } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { routes } from '../navigation';
import { ActivityIndicator, FloatingButton, SearchInput, Text } from '../components';
import { useHashtags, useNavigation, useTheme } from '../hooks';
import colors from '../config/colors';

export default () => {
  const [query, setQuery] = useState('');
  const [refreshing, setRefreshing] = useState(false);
  const { hashtags, initHashtags, isLoading } = useHashtags();
  const { theme } = useTheme();
  const navigation = useNavigation();

  const viewSparklesOfHashtag = (hashtag: string) =>
    navigation.navigate(routes.HASHTAG, { hashtag });

  const handleRefresh = async () => {
    setRefreshing(true);
    await initHashtags();
    setRefreshing(false);
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <SearchInput
          placeholder="Search Hashtags"
          onSearchQueryChange={setQuery}
          searchQuery={query}
        />

        <FloatingButton onPress={() => navigation.navigate(routes.NEW_SPARKLE)} />

        <FlatList
          data={Object.entries(hashtags).sort((a, b) => b[1] - a[1])}
          keyExtractor={([tag]) => tag}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={handleRefresh}
              tintColor={theme.colors.text}
              colors={[theme.colors.primary]}
            />
          }
          renderItem={({ item: [tag, count] }) => (
            <TouchableOpacity
              style={[styles.hashtagItem, { backgroundColor: theme.colors.background }]}
              onPress={() => viewSparklesOfHashtag(tag)}
            >
              <View>
                <Text isBold style={styles.hashtagText}>
                  #{tag}
                </Text>
                <Text>
                  {count} Sparkle{count === 1 ? '' : 's'}
                </Text>
              </View>
              <FontAwesome name="chevron-right" size={14} color={theme.colors.text} />
            </TouchableOpacity>
          )}
        />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 10,
    position: 'relative',
  },
  hashtagItem: {
    alignItems: 'center',
    backgroundColor: colors.white,
    borderRadius: 12,
    elevation: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
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
  },
});
