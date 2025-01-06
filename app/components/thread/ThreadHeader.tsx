import React from 'react';
import { StyleSheet } from 'react-native';

import colors from '../../config/colors';
import Text from '../Text';

interface Props {
  label?: string;
}

export default ({ label = 'Sparkle' }: Props) => {
  return (
    <Text style={[styles.logo, styles.title]} isBold>
      {label}
    </Text>
  );
};

const styles = StyleSheet.create({
  logo: {
    color: colors.dark,
    fontSize: 18,
    letterSpacing: 0.3,
  },
  title: {
    fontSize: 16,
    letterSpacing: 0.2,
  },
});
