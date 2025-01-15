import { useFormikContext } from 'formik';
import { DimensionValue } from 'react-native';

import { IconName } from '../TextInput';
import ErrorMessage from './ErrorMessage';
import Picker, { PickerItem } from '../Picker';

interface Props {
  icon?: IconName;
  name: string;
  items: PickerItem[];
  numberOfColumns?: number;
  PickerItemComponent?: React.ComponentType<{
    item: PickerItem;
    onPress: VoidFunction;
  }>;
  placeholder?: string;
  width?: DimensionValue;
}

export default function FormPicker(props: Props) {
  const { errors, setFieldValue, touched, values } = useFormikContext();

  const { icon, items, name, numberOfColumns, PickerItemComponent, placeholder, width } = props;

  return (
    <>
      <Picker
        items={items}
        numberOfColumns={numberOfColumns}
        onSelectItem={(item) => setFieldValue(name, item)}
        PickerItemComponent={PickerItemComponent}
        placeholder={placeholder}
        selectedItem={values[name]}
        width={width}
        icon={icon}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
