import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import colors from '../../config/colors';

interface Props {
  size?: number;
}

export default ({ size = 24 }: Props) => (
  <Icon name="head-lightbulb-outline" size={size} color={colors.white} />
);
