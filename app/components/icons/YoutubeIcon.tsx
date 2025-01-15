import { OpaqueColorValue } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome5';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import colors from '../../config/colors';

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
  focused?: boolean;
}

export default ({ color = colors.medium, focused, size = 18 }: Props) => (
  <MaterialCommunityIcons name='youtube'size={size} color={color} />
);
