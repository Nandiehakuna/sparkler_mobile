import { StyleProp, StyleSheet, TouchableOpacity, ViewStyle } from 'react-native';

import colors from '../config/colors';
import Text from './Text';

interface Props {
  color?: string;
  onPress: () => void;
  title: string;
  LeftIcon?: JSX.Element;
  style?: StyleProp<ViewStyle>;
}

function AppButton({ color = 'blue', LeftIcon, onPress, style, title }: Props) {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor: colors[color] }, style]}
      onPress={onPress}
    >
      {LeftIcon}
      <Text style={styles.text} isBold>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    alignItems: 'center',
    backgroundColor: colors.primary,
    borderRadius: 25,
    elevation: 3,
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: 10,
    padding: 15,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    width: '100%',
  },
  text: {
    color: colors.white,
    fontSize: 18,
    textTransform: 'uppercase',
  },
});

export default AppButton;
