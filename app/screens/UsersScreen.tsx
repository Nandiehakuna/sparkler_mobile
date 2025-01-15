import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import {
  ActivityIndicator,
  FloatingButton,
  SearchInput,
  UserCard,
  UserCardSeparator,
} from '../components';
import { routes } from '../navigation';
import { ScreenProps } from '../utils/types';
import { useTheme, useUsers } from '../hooks';

export default ({ navigation }: ScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();
  const { users: allUsers, isLoading } = useUsers();

  const filteredUsers = allUsers.filter(
    ({ name, username }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <>
      <ActivityIndicator visible={isLoading} />
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <SearchInput onSearchQueryChange={setSearchQuery} searchQuery={searchQuery} />
        <FlatList
          data={filteredUsers}
          keyExtractor={(user) => user._id}
          renderItem={({ item }) => <UserCard user={item} />}
          ItemSeparatorComponent={UserCardSeparator}
        />

        <FloatingButton onPress={() => navigation.navigate(routes.NEW_SPARKLE)} />
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingVertical: 10,
  },
});
