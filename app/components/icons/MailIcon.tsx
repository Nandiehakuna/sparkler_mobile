import { OpaqueColorValue } from 'react-native';
import Icon from '@expo/vector-icons/Feather';

import { useTheme } from '../../hooks';

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
}

export default ({ color, size = 18 }: Props) => {
  const { theme } = useTheme();

  return <Icon name="mail" size={size} color={color || theme.colors.text} />;
};
