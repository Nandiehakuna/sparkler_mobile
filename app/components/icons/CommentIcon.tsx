import { OpaqueColorValue } from 'react-native';
import Icon from '@expo/vector-icons/Ionicons';

import { useTheme } from '../../hooks';

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
}

export default ({ color, size = 20 }: Props) => {
  const { theme } = useTheme();

  return <Icon name="chatbubble-outline" size={size} color={color || theme.colors.text} />;
};
