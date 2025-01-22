import { useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import {
  ActivityIndicator,
  AppRefreshControl,
  FloatingButton,
  RetryButton,
  SearchInput,
  UserCard,
  UserCardSeparator,
} from '../components';
import { routes } from '../navigation';
import { ScreenProps } from '../utils/types';
import { User } from '../contexts/UsersContext';
import { useTheme, useUsers } from '../hooks';
import usersApi from '../api/users';

export default ({ navigation }: ScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();
  const { users: allUsers, isLoading, setUsers, setLoading } = useUsers();

  const retryGettingUsers = async () => {
    setLoading(true);
    const res = await usersApi.getAllUsers();
    setLoading(false);

    if (res.ok) setUsers(res.data as User[]);
  };

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
          ListHeaderComponent={
            <RetryButton onPress={retryGettingUsers} visible={!allUsers.length} />
          }
          refreshControl={<AppRefreshControl onRefresh={retryGettingUsers} />}
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
