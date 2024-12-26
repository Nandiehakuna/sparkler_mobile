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
import { useUsers } from '../hooks';
import colors from '../config/colors';

export default ({ navigation }: ScreenProps) => {
  const { users: allUsers, isLoading } = useUsers();
  const [searchQuery, setSearchQuery] = useState('');

  const filteredUsers = allUsers.filter(
    ({ name, username }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      username.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  if (isLoading) return <ActivityIndicator />;

  return (
    <View style={styles.container}>
      <SearchInput
        onSearchQueryChange={setSearchQuery}
        searchQuery={searchQuery}
      />
      <FlatList
        data={filteredUsers}
        keyExtractor={(user) => user._id}
        renderItem={({ item }) => <UserCard user={item} />}
        ItemSeparatorComponent={UserCardSeparator}
      />

      <FloatingButton onPress={() => navigation.navigate(routes.NEW_SPARKLE)} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.white,
    padding: 16,
    paddingBottom: 0,
    paddingTop: 10,
  },
});
