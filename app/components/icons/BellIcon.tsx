import { OpaqueColorValue } from 'react-native';
import Icon from '@expo/vector-icons/Entypo';

import colors from '../../config/colors';

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
  focused?: boolean;
}

export default ({ color = colors.medium, focused, size = 18 }: Props) => (
  <Icon name="bell" size={size} color={color} />
);
