import { StyleProp, Text as RNText, TextProps, TextStyle } from 'react-native';

interface Props extends TextProps {
  isBold?: boolean;
}

export default (props: Props) => {
  const { children, isBold, style = {}, ...rest } = props;

  const getStyle = (): StyleProp<TextStyle> => {
    return [
      style,
      {
        fontFamily: isBold ? 'Quicksand_700Bold' : 'Quicksand_400Regular',
      },
    ];
  };

  return (
    <RNText style={getStyle()} {...rest}>
      {children}
    </RNText>
  );
};
