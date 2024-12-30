import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

import { routes } from '../../navigation';
import { useNavigation, useUser } from '../../hooks';
import colors from '../../config/colors';
import Text from '../Text';

export default () => {
  const { user } = useUser();
  const navigation = useNavigation();

  if (user) return null;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => navigation.navigate(routes.AUTH)}
    >
      <Text style={styles.text} isBold>
        Login
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    marginRight: 18,
  },
  text: {
    color: colors.blue,
    fontSize: 17,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
});
