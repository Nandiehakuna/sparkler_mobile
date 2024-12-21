import { OpaqueColorValue } from 'react-native';
import Icon from '@expo/vector-icons/FontAwesome';

import colors from '../../config/colors';

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
  focused?: boolean;
}

export default ({ color = colors.medium, size = 18 }: Props) => (
  <Icon name="search" size={size} color={color} />
);
