import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/Feather';

import { useNavigation, useTheme } from '../../hooks';
import colors from '../../config/colors';
import Text from '../Text';

interface Props {
  buttonTitle: string;
  disable: boolean;
  loading: boolean;
  onButtonPress: VoidFunction;
  onCancelPress?: VoidFunction;
}

export default ({ buttonTitle, disable, loading, onButtonPress, onCancelPress }: Props) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  const computeButtonTitle = (): string => {
    if (!loading) return buttonTitle;

    const lastCharIndex = buttonTitle.length - 1;
    const lastChar = buttonTitle.charAt(lastCharIndex);

    return lastChar.toLocaleLowerCase() === 'e'
      ? buttonTitle.replace('e', '') + 'ing..'
      : buttonTitle + 'ing...';
  };

  const cancelUpdate = () => (onCancelPress ? onCancelPress() : navigation.goBack());

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
      <Icon name="x" size={25} color={theme.colors.text} onPress={cancelUpdate} />

      <TouchableOpacity
        style={[styles.button, { backgroundColor: disable ? colors.light : colors.blue }]}
        onPress={onButtonPress}
      >
        <Text style={{ color: disable ? colors.medium : colors.white }} isBold>
          {computeButtonTitle()}
        </Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: 20,
    paddingVertical: 8,
    paddingHorizontal: 16,
  },
  header: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 15,
    width: '100%',
  },
});
