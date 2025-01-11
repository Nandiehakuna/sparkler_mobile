import { OpaqueColorValue } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';

import { useTheme } from '../../hooks';

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
  focused?: boolean;
}

export default ({ color, focused, size = 18 }: Props) => {
  const { theme } = useTheme();

  return (
    <Icon name={focused ? 'user-alt' : 'user'} size={size} color={color || theme.colors.text} />
  );
};
