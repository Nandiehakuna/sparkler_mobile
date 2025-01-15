import Fontisto from '@expo/vector-icons/Fontisto';

import { useTheme } from '../../hooks';
import colors from '../../config/colors';

interface Props {
  size?: number;
  liked: boolean;
}

export default ({ liked, size = 18 }: Props) => {
  const { theme } = useTheme();

  return (
    <Fontisto
      color={liked ? colors.primary : theme.colors.text}
      name={liked ? 'heart' : 'heart-alt'}
      size={size}
    />
  );
};
