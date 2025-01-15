import { StyleProp, Text as RNText, TextProps, TextStyle } from 'react-native';
import useTheme from '../hooks/useTheme';

interface Props extends TextProps {
  isBold?: boolean;
}

export default (props: Props) => {
  const { children, isBold, style = {}, ...rest } = props;
  const { theme } = useTheme();

  const getStyle = (): StyleProp<TextStyle> => {
    return [
      {
        color: theme.colors.text,
        fontFamily: isBold ? 'Quicksand_700Bold' : 'Quicksand_400Regular',
        fontSize: 15,
        letterSpacing: 0.2,
      },
      style,
    ];
  };

  return (
    <RNText style={getStyle()} {...rest}>
      {children}
    </RNText>
  );
};
