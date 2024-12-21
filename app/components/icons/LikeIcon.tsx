import Fontisto from '@expo/vector-icons/Fontisto';

import colors from '../../config/colors';

interface Props {
  size?: number;
  liked: boolean;
}

export default ({ liked, size = 18 }: Props) => (
  <Fontisto
    color={liked ? colors.primary : colors.medium}
    name={liked ? 'heart' : 'heart-alt'}
    size={size}
  />
);
