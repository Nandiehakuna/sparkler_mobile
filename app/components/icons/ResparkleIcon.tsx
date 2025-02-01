import FontAwesome from '@expo/vector-icons/FontAwesome6';
import Feather from '@expo/vector-icons/Feather';

import { useTheme } from '../../hooks';
import colors from '../../config/colors';

interface Props {
  resparkled: boolean;
  size?: number;
  inactive?: boolean;
}

export default ({ inactive, resparkled, size = 22 }: Props) => {
  const { theme } = useTheme();

  return resparkled ? (
    <FontAwesome name="retweet" size={size} color={colors.green} />
  ) : (
    <Feather size={size} name="repeat" color={inactive ? colors.light : theme.colors.text} />
  );
};
