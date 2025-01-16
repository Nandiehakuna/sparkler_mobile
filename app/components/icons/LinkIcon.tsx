import { OpaqueColorValue } from 'react-native';
import Entypo from '@expo/vector-icons/Entypo';

import { useTheme } from '../../hooks';

interface Props {
  color?: string | OpaqueColorValue;
  size?: number;
}

export default ({ color, size = 24 }: Props) => {
  const { theme } = useTheme();

  return <Entypo name="link" size={size} color={color || theme.colors.text} />;
};
