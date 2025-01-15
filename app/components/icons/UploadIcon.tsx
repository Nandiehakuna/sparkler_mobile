import Icon from '@expo/vector-icons/Feather';

import { useTheme } from '../../hooks';
import colors from '../../config/colors';

interface Props {
  size?: number;
}

export default ({ size = 20 }: Props) => {
  const { theme } = useTheme();

  return <Icon name="upload" size={size} color={theme.colors.text} />;
};
