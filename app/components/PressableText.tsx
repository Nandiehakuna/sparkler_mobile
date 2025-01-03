import { TextProps, TouchableOpacity } from 'react-native';

import Text from './Text';

interface Props extends TextProps {
  onPress: VoidFunction;
}

export default ({ children, onPress, ...otherProps }: Props) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <Text {...otherProps}>{children}</Text>
    </TouchableOpacity>
  );
};
