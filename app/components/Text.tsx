import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

interface Props extends TextProps {
  isBold?: boolean;
}

export default (props: Props) => {
  const { children, isBold: useBoldFontFamily, style = {}, ...rest } = props;

  const getStyle = (): StyleProp<TextStyle> => {
    return [
      style,
      {
        fontFamily: useBoldFontFamily
          ? 'Quicksand_700Bold'
          : 'Quicksand_400Regular',
        fontWeight: useBoldFontFamily ? '700' : '400',
      },
    ];
  };

  return (
    <Text style={getStyle()} {...rest}>
      {children}
    </Text>
  );
};
