import { StyleSheet, TouchableOpacity, View } from 'react-native';
import Icon from '@expo/vector-icons/Feather';

import { useNavigation, useTheme } from '../../hooks';
import colors from '../../config/colors';
import Text from '../Text';

// Props interface for when the button should be shown
interface WithButtonProps {
  buttonTitle: string;
  disable: boolean;
  loading: boolean;
  onButtonPress: VoidFunction;
  onCancelPress?: VoidFunction;
  showButton?: boolean;
}

// Props interface for when the button should not be shown
interface WithoutButtonProps {
  onCancelPress?: VoidFunction;
  showButton: false;
  buttonTitle?: string;
  disable?: boolean;
  loading?: VoidFunction;
  onButtonPress?: VoidFunction;
}

// Component that can accept either WithButtonProps or WithoutButtonProps
export default ({
  buttonTitle = '',
  disable,
  loading,
  onButtonPress,
  onCancelPress,
  showButton = true,
}: WithButtonProps | WithoutButtonProps) => {
  const { theme } = useTheme();
  const navigation = useNavigation();

  // Function to compute the button title based on loading state
  const computeButtonTitle = (): string => {
    if (!loading) return buttonTitle;

    const lastCharIndex = buttonTitle.length - 1;
    const lastChar = buttonTitle.charAt(lastCharIndex);

    return lastChar.toLowerCase() === 'e'
      ? buttonTitle.slice(0, -1) + 'ing..'
      : buttonTitle + 'ing...';
  };

  // Function to handle cancel action, using onCancelPress if provided, otherwise go back
  const cancelUpdate = () => {
    if (onCancelPress) {
      onCancelPress();
    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={[styles.header, { backgroundColor: theme.colors.background }]}>
      <TouchableOpacity onPress={cancelUpdate}>
        <Icon name="x" size={25} color={theme.colors.text} />
      </TouchableOpacity>

      {showButton && (
        <TouchableOpacity
          style={[styles.button, { backgroundColor: disable ? colors.light : colors.blue }]}
          onPress={onButtonPress}
          disabled={disable}
        >
          <Text style={{ color: disable ? colors.medium : colors.white }} isBold>
            {computeButtonTitle()}
          </Text>
        </TouchableOpacity>
      )}
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
