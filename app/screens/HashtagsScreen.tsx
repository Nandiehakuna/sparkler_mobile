import { useState } from 'react';
import { FlatList, StyleSheet, View, TouchableOpacity } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';

import { routes } from '../navigation';
import {
  ActivityIndicator,
  FloatingButton,
  SearchInput,
  Text,
} from '../components';
import { useHashtags, useNavigation } from '../hooks';
import colors from '../config/colors';

export default () => {
  const [query, setQuery] = useState('');
  const { hashtags, isLoading } = useHashtags();
  const navigation = useNavigation();

  const viewSparklesOfHashtag = (hashtag: string) => {
    navigation.navigate(routes.HASHTAG, { hashtag });
  };

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <View style={styles.container}>
        <SearchInput
          placeholder="Search Hashtags"
          onSearchQueryChange={setQuery}
          searchQuery={query}
        />

        <FloatingButton
          onPress={() => navigation.navigate(routes.NEW_SPARKLE)}
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
                <Text useBoldFontFamily style={styles.hashtagText}>
                  #{tag}
                </Text>
                <Text>
                  {count} Sparkle{count === 1 ? '' : 's'}
                </Text>
              </View>
              <FontAwesome
                name="chevron-right"
                size={14}
                color={colors.medium}
              />
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
    backgroundColor: colors.white,
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
    fontWeight: '600',
  },
});
