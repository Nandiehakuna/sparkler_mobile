import { OpaqueColorValue } from 'react-native';
import AntDesign from '@expo/vector-icons/AntDesign';

import { useTheme } from '../../hooks';

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
  focused?: boolean;
}

export default ({ color, size = 18 }: Props) => {
  const { theme } = useTheme();

  return <AntDesign name="linkedin-square" size={size} color={color || theme.colors.text} />;
};
