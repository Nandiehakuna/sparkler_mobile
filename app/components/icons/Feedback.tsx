import { OpaqueColorValue } from 'react-native';
import Icon from '@expo/vector-icons/Octicons';

import colors from '../../config/colors';

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
}

export default ({ color = colors.medium, size = 18 }: Props) => (
  <Icon name="feed-discussion" size={size} color={color} />
);
