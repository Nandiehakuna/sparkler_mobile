import { StyleSheet, View } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

import colors from '../../config/colors';

interface Props {
  Icon?: JSX.Element;
}

export default ({
  Icon = <Ionicons name="sparkles-sharp" size={25} style={styles.sparklesIcon} />,
}: Props) => {
  return (
    <View style={styles.container}>
      <View style={styles.iconsContainer}>
        <Ionicons name="add" size={14} style={styles.plusIcon} />
        {Icon}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  iconsContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    justifyContent: 'center',
  },
  plusIcon: {
    color: colors.white,
    marginBottom: 6,
  },
  sparklesIcon: {
    color: colors.white,
  },
});
