import Fontisto from '@expo/vector-icons/Fontisto';

import { useTheme } from '../../hooks';
import colors from '../../config/colors';

interface Props {
  size?: number;
  liked: boolean;
  inactive?: boolean;
}

export default ({ inactive, liked, size = 18 }: Props) => {
  const { theme } = useTheme();

  return (
    <Fontisto
      color={liked ? colors.primary : inactive ? colors.light : theme.colors.text}
      name={liked ? 'heart' : 'heart-alt'}
      size={size}
    />
  );
};
