import React from "react";
import { StyleSheet, TextInput, TextInputProps, View } from "react-native";

import { Search } from "../assets/icons";

interface Props extends TextInputProps {
  onSearchQueryChange: (query: string) => void;
  searchQuery: string;
}

export default ({
  onSearchQueryChange,
  searchQuery,
  placeholder = "Search Sparklers",
  ...rest
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.icon}>
        <Search />
      </View>
      <TextInput
        {...rest}
        style={styles.input}
        placeholder={placeholder}
        value={searchQuery}
        onChangeText={(text) => onSearchQueryChange(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#fff",
    borderRadius: 8,
    paddingHorizontal: 12,
    marginBottom: 16,
    elevation: 1,
    height: 40,
  },
  icon: {
    marginRight: 8,
    color: "#777",
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: "#333",
  },
});
