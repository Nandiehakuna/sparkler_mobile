import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

interface Props extends TextProps {
  useBoldFontFamily?: boolean;
}

export default (props: Props) => {
  const { children, useBoldFontFamily, style = {}, ...rest } = props;

  const getStyle = (): StyleProp<TextStyle> => {
    return [
      {
        fontFamily: useBoldFontFamily
          ? 'Quicksand_700Bold'
          : 'Quicksand_400Regular',
      },
      style,
    ];
  };

  return (
    <Text style={getStyle()} {...rest}>
      {children}
    </Text>
  );
};
