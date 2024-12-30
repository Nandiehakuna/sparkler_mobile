import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';

import Text from '../Text';

interface Props {
  Icon: React.ReactNode;
  label: string;
  onPress: () => void;
}

export default ({ Icon, label, onPress }: Props) => {
  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
      activeOpacity={0.8}
    >
      <View style={styles.iconContainer}>{Icon}</View>
      <Text style={styles.text} useBoldFontFamily>
        {label}
      </Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#fff',
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: '#ddd',
    borderRadius: 10,
  },
  iconContainer: {
    width: 40,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    marginRight: 15,
  },
  text: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
});
