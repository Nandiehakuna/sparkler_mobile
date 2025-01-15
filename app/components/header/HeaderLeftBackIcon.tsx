import { MaterialCommunityIcons } from '@expo/vector-icons';
import { StyleSheet } from 'react-native';

import { useNavigation, useTheme } from '../../hooks';

export default () => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  return (
    <MaterialCommunityIcons
      name="chevron-left"
      size={30}
      color={theme.colors.text}
      style={styles.icon}
      onPress={() => navigation.goBack()}
    />
  );
};

const styles = StyleSheet.create({
  icon: {
    marginLeft: 7,
  },
});
