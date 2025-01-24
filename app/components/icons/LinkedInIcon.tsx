import { OpaqueColorValue } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';

import { useTheme } from '../../hooks';

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
  focused?: boolean;
}

export default ({ color, size = 18 }: Props) => {
  const { theme } = useTheme();

  return <FontAwesome5 name="linkedIn" size={size} color={color || theme.colors.text} />;
};
