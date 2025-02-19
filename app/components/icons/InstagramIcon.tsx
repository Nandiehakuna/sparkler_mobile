import { OpaqueColorValue } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { useTheme } from '../../hooks';

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
  focused?: boolean;
}

export default ({ color, size = 18 }: Props) => {
  const { theme } = useTheme();

  return <Icon name="instagram" size={size} color={color || theme.colors.text} />;
};
