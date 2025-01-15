import { useFormikContext } from 'formik';
import { DimensionValue, TextInputProps } from 'react-native';

import ErrorMessage from './ErrorMessage';
import Text from '../Text';
import TextInput, { IconName } from '../TextInput';

interface Props extends TextInputProps {
  icon?: IconName;
  label?: string;
  name: string;
  onFormTextChange?: (text: string) => void;
  width?: DimensionValue;
}

export default function FormField(props: Props) {
  const { setFieldTouched, setFieldValue, errors, touched, values } = useFormikContext();

  const { name, width, label, onFormTextChange, placeholder, ...otherProps } = props;

  const handleTextChange = (text: string) => {
    onFormTextChange?.(text);
    setFieldValue(name, text);
  };

  return (
    <>
      {Boolean(label?.length) && <Text>{label}</Text>}
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={handleTextChange}
        placeholder={placeholder || name}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
