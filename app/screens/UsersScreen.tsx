import React, { useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  StyleSheet,
  TextInput,
  View,
} from "react-native";

import { Search } from "../assets/icons";
import { useUsers } from "../hooks";
import UserCard from "../components/UserCard";

export default () => {
  const { allUsers, isLoading } = useUsers();
  const [searchQuery, setSearchQuery] = useState("");

  const filteredUsers = allUsers.filter(
    (user) =>
      user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.username.toLowerCase().includes(searchQuery.toLowerCase())
  );

  if (isLoading)
    return (
      <View style={styles.loader}>
        <ActivityIndicator />
      </View>
    );

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <View style={styles.searchIcon}>
          <Search />
        </View>
        <TextInput
          style={styles.searchInput}
          placeholder="Search users"
          value={searchQuery}
          onChangeText={(text) => setSearchQuery(text)}
        />
      </View>
      <FlatList
        data={filteredUsers}
        keyExtractor={(user) => user._id}
        renderItem={({ item }) => <UserCard user={item} />}
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
  loader: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    elevation: 1,
    height: 40,
  },
  searchIcon: {
    marginRight: 8,
    color: "#777",
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
  separator: {
    height: 8,
  },
});
