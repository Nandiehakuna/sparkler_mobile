import { StyleSheet } from 'react-native';
import {
  DrawerContentComponentProps,
  DrawerItem,
} from '@react-navigation/drawer';

import colors from '../../config/colors';

export default (props: DrawerContentComponentProps) => {
  return props.state.routes.map((route, i) => {
    const focused = i === props.state.index;
    const { options } = props.descriptors[route.key];
    const label =
      options.drawerLabel !== undefined
        ? options.drawerLabel
        : options.title !== undefined
        ? options.title
        : route.name;

    const onPress = () => {
      props.navigation.navigate(route.name);
    };

    return (
      <DrawerItem
        key={route.key}
        label={label}
        icon={options.drawerIcon}
        focused={focused}
        onPress={onPress}
        activeTintColor={colors.blue}
        inactiveTintColor={colors.medium}
        labelStyle={[styles.drawerLabel, focused && styles.focusedLabel]}
        style={[styles.drawerItem, focused && styles.focusedItem]}
      />
    );
  });
};

const styles = StyleSheet.create({
  drawerLabel: {
    fontFamily: 'Quicksand_400Regular',
    fontSize: 15,
    marginLeft: 7,
  },
  drawerItem: {
    paddingVertical: 5,
    paddingHorizontal: 5,
  },
  focusedLabel: {
    color: colors.blue,
  },
  focusedItem: {
    backgroundColor: '#E8F5FD',
  },
});
