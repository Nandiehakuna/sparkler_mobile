import Icon from '@expo/vector-icons/Feather';

import { useTheme } from '../../hooks';
import colors from '../../config/colors';

interface Props {
  size?: number;
  inactive?: boolean;
}

export default ({ inactive, size = 20 }: Props) => {
  const { theme } = useTheme();

  return <Icon name="upload" size={size} color={inactive ? colors.light : theme.colors.text} />;
};
