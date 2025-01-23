import { StyleSheet, TextInput, TextInputProps, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

import { SearchIcon } from './icons';
import { useTheme } from '../hooks';

interface Props extends TextInputProps {
  onSearchQueryChange: (query: string) => void;
  searchQuery: string;
}

export default ({
  onChangeText,
  onSearchQueryChange,
  searchQuery,
  placeholder = 'Search Sparklers',
  ...rest
}: Props) => {
  const { theme } = useTheme();

  const clearText = () => onSearchQueryChange('');

  return (
    <View style={[styles.container, { backgroundColor: theme.colors.background }]}>
      <View style={styles.searchIcon}>
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
      {Boolean(searchQuery.length) && (
        <View style={styles.searchIcon}>
          <Feather name="x-circle" size={24} color={theme.colors.text} onPress={clearText} />
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  cancelIcon: {
    marginLeft: 8,
  },
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
  searchIcon: {
    marginRight: 8,
  },
  input: {
    fontFamily: 'Quicksand_400Regular',
    flex: 1,
    fontSize: 16,
    letterSpacing: 0.3,
  },
});
