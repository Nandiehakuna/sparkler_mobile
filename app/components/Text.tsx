import { StyleProp, Text, TextProps, TextStyle } from 'react-native';

interface Props extends TextProps {
  isBold?: boolean;
}

export default ({ children, isBold, style = {}, ...rest }: Props) => {
  const getStyle = (): StyleProp<TextStyle> => {
    return [
      { fontFamily: isBold ? 'Quicksand_700Bold' : 'Quicksand_400Regular' },
      style,
    ];
  };

  return (
    <Text style={getStyle()} {...rest}>
      {children}
    </Text>
  );
};
