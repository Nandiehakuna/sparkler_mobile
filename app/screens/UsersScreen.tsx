import React, { useState } from "react";
import { FlatList, StyleSheet, View } from "react-native";

import { ActivityIndicator, SearchInput, UserCard } from "../components";
import { ScreenProps } from "../utils/types";
import { useUsers } from "../hooks";

export default ({ navigation }: ScreenProps) => {
  const { allUsers, isLoading } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = allUsers.filter(
    ({ name, username }) =>
      name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      username.toLowerCase().includes(searchQuery.toLowerCase())
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
        renderItem={({ item }) => (
          <UserCard navigation={navigation} user={item} />
        )}
        ItemSeparatorComponent={() => <View style={styles.separator} />}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    paddingBottom: 0,
    paddingTop: 0,
    marginTop: 10,
    backgroundColor: "#f9f9f9",
  },
  separator: {
    height: 8,
  },
});
