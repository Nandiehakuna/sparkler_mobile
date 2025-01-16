import { TouchableOpacity, StyleSheet, View } from 'react-native';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

import { PickerItem } from './Picker';
import colors from '../config/colors';
import Text from './Text';

interface Props {
  item: PickerItem;
  onPress: VoidFunction;
}

function PickerItemComp({ item, onPress }: Props) {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.container}>
        {!!item.icon.length && (
          <View style={styles.iconContainer}>
            <Icon name={item.icon} size={35} color={colors.medium} style={styles.icon} />
            <Text style={styles.text}>{item.label}</Text>
          </View>
        )}
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    backgroundColor: colors.light,
    borderRadius: 25,
    marginHorizontal: 10,
    marginVertical: 10,
    padding: 15,
    paddingHorizontal: 20,
  },
  iconContainer: {
    alignItems: 'center',
  },
  icon: {
    marginBottom: 10,
  },
  text: {
    color: colors.medium,
    fontSize: 16,
    textAlign: 'center',
  },
});

export default PickerItemComp;
