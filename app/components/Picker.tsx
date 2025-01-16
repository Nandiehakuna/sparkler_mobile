import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  TouchableWithoutFeedback,
  Button,
  FlatList,
  DimensionValue,
  Modal,
} from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { IconName } from './TextInput';
import colors from '../config/colors';
import PickerItemComp from './PickerItem';
import Text from './Text';

export type PickerItem = { label: string; id: string; icon?: IconName };

export interface PickerProps {
  icon?: IconName;
  items: PickerItem[];
  numberOfColumns?: number;
  onSelectItem: (item: PickerItem) => void;
  PickerItemComponent?: React.ComponentType<{
    item: PickerItem;
    onPress: VoidFunction;
  }>;
  placeholder?: string;
  selectedItem?: { label: string; value: any };
  width?: DimensionValue;
}

function AppPicker(props: PickerProps) {
  const [modalVisible, setModalVisible] = useState(false);

  const {
    icon,
    items,
    numberOfColumns = 1,
    onSelectItem,
    PickerItemComponent = PickerItemComp,
    placeholder,
    selectedItem,
    width = '100%',
  } = props;

  return (
    <>
      <TouchableWithoutFeedback onPress={() => setModalVisible(true)}>
        <View style={[styles.container, { width }]}>
          {!!icon.length && (
            <MaterialCommunityIcons
              name={icon}
              size={20}
              color={colors.medium}
              style={styles.icon}
            />
          )}
          {selectedItem ? (
            <Text style={styles.text}>{selectedItem.label}</Text>
          ) : (
            <Text style={styles.placeholder}>{placeholder}</Text>
          )}

          <MaterialCommunityIcons name="chevron-down" size={20} color={colors.medium} />
        </View>
      </TouchableWithoutFeedback>
      <Modal visible={modalVisible}>
        <Button title="Close" onPress={() => setModalVisible(false)} />
        <FlatList
          data={items}
          keyExtractor={(item) => item.id}
          numColumns={numberOfColumns}
          renderItem={({ item }) => (
            <PickerItemComponent
              item={item}
              onPress={() => {
                setModalVisible(false);
                onSelectItem(item);
              }}
            />
          )}
        />
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.light,
    borderRadius: 25,
    flexDirection: 'row',
    padding: 15,
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
  placeholder: {
    color: colors.medium,
    flex: 1,
  },
  text: {
    color: colors.dark,
    flex: 1,
  },
});

export default AppPicker;
