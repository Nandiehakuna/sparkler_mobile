import React from 'react';
import Icon from '@expo/vector-icons/Feather';

import colors from '../../config/colors';

interface Props {
  size?: number;
}

export default ({ size = 20 }: Props) => (
  <Icon name="upload" size={size} color={colors.medium} />
);
