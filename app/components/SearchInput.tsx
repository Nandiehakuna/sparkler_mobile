import React from 'react';
import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';

import { SearchIcon } from './icons';
import { useTheme } from '../hooks';
import colors from '../config/colors';

interface Props extends TextInputProps {
  onSearchQueryChange: (query: string) => void;
  searchQuery: string;
}

export default ({
  onSearchQueryChange,
  searchQuery,
  placeholder = 'Search Sparklers',
  ...rest
}: Props) => {
  const { theme } = useTheme();

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.icon}>
        <SearchIcon color={theme.colors.text} />
      </View>
      <TextInput
        {...rest}
        style={[styles.input, { color: theme.colors.text }]}
        placeholder={placeholder}
        placeholderTextColor={theme.colors.text}
        value={searchQuery}
        onChangeText={(text) => onSearchQueryChange(text)}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    borderRadius: 8,
    elevation: 1,
    flexDirection: 'row',
    height: 40,
    marginBottom: 16,
    paddingHorizontal: 12,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 6,
  },
  icon: {
    marginRight: 8,
  },
  input: {
    flex: 1,
    fontSize: 16,
  },
});
