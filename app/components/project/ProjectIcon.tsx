import { OpaqueColorValue } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { useTheme } from '../../hooks';

interface Props {
  color?: string | OpaqueColorValue;
  size?: number;
}

export default ({ color, size = 24 }: Props) => {
  const { theme } = useTheme();

  return <Icon name="head-lightbulb-outline" size={size} color={color || theme.colors.text} />;
};
