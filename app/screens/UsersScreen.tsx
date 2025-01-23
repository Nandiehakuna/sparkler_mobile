import { useEffect, useState } from 'react';
import { FlatList, StyleSheet, View } from 'react-native';

import {
  ActivityIndicator,
  FloatingButton,
  SearchInput,
  UserCard,
  UserCardSeparator,
} from '../components';
import { getValidUsers, getVerifiedFirst } from '../hooks/useUsers';
import { routes } from '../navigation';
import { ScreenProps } from '../utils/types';
import { useTheme, useToast } from '../hooks';
import { User } from '../contexts/UsersContext';
import usersApi from '../api/users';

export default ({ navigation }: ScreenProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const { theme } = useTheme();
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<User[]>([]);
  const toast = useToast();

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        setLoading(true);
        const res = await usersApi.getAllUsers();
        if (res.ok) setUsers(getVerifiedFirst(getValidUsers(res.data as User[])));
        setLoading(false);
      } catch (error) {
        toast.show('Error fetching users', 'error');
      }
    };

    fetchUsers();
  }, []);

  const filteredUsers = users.filter(
    ({ name, username }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      username.toLowerCase().includes(searchQuery.toLowerCase())
  );
  // TODO: add a retry button
  return (
    <>
      <ActivityIndicator visible={loading} />
      <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
        <SearchInput
          onSearchQueryChange={setSearchQuery}
          searchQuery={searchQuery}
          style={styles.searchInput}
        />

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
    paddingVertical: 5,
  },
  searchInput: {
    marginTop: 10,
  },
});
