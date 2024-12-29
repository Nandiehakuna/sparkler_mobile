import { OpaqueColorValue } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import colors from '../../config/colors';

interface Props {
  color?: string | OpaqueColorValue | undefined;
  size?: number;
  bookmarked?: boolean;
}

export default ({ bookmarked, size = 23, color = colors.medium }: Props) => (
  <Ionicons
    name={bookmarked ? 'bookmark' : 'bookmark-outline'}
    size={size}
    color={bookmarked ? colors.blue : color}
  />
);
