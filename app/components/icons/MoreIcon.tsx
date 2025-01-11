import { OpaqueColorValue, TouchableOpacity } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import { useTheme } from '../../hooks';

interface Props {
  color?: string | OpaqueColorValue | undefined;
  onPress: () => void;
  size?: number;
}

export default ({ color, onPress, size = 15 }: Props) => {
  const { theme } = useTheme();

  return (
    <TouchableOpacity onPress={onPress}>
      <Icon name="ellipsis-vertical" size={size} color={color || theme.colors.text} />
    </TouchableOpacity>
  );
};
