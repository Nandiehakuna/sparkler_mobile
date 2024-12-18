import React from "react";
import { useFormikContext } from "formik";

import { DimensionValue, TextInputProps } from "react-native";
import ErrorMessage from "./ErrorMessage";
import TextInput, { IconName } from "../TextInput";
import { Text } from "react-native";

interface Props extends TextInputProps {
  icon: IconName;
  name: string;
  width?: DimensionValue;
  label?:string;
}

export default function FormField({ name, width,label ,...otherProps }: Props) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <>
    {label && <Text>{label}</Text>}
      <TextInput
        onBlur={() => setFieldTouched(name)}
        onChangeText={(text) => setFieldValue(name, text)}
        value={values[name]}
        width={width}
        {...otherProps}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </>
  );
}
