import React from 'react';
import {
  DimensionValue,
  StyleProp,
  StyleSheet,
  TextInput,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../config/colors';

export type IconName = React.ComponentProps<typeof MaterialCommunityIcons>['name'];

interface Props extends TextInputProps {
  icon?: IconName;
  style?: StyleProp<ViewStyle>;
  width?: DimensionValue;
}

export default function AppTextInput({ icon, style = {}, width = '100%', ...otherProps }: Props) {
  return (
    <View style={[styles.container, { width }, style]}>
      {!!icon?.length && (
        <MaterialCommunityIcons name={icon} size={20} color={colors.medium} style={styles.icon} />
      )}

      <TextInput
        multiline
        placeholderTextColor={colors.medium}
        style={[styles.textInput, { color: colors.medium }]}
        {...otherProps}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'flex-start',
    backgroundColor: colors.light,
    borderRadius: 30,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    padding: 15,
  },
  icon: {
    marginRight: 10,
    marginTop: 12,
  },
  textInput: {
    flex: 1,
    backgroundColor: colors.light,
    borderRadius: 8,
    fontFamily: 'Quicksand_400Regular',
    fontSize: 16,
    lineHeight: 22,
    textAlignVertical: 'top',
  },
});
