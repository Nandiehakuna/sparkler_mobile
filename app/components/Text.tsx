import { StyleProp, Text as RNText, TextProps, TextStyle } from 'react-native';

interface Props extends TextProps {
  isBold?: boolean;
}

export default (props: Props) => {
  const { children, isBold, style = {}, ...rest } = props;

  const getStyle = (): StyleProp<TextStyle> => {
    return [
      {
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
