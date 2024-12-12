import React from "react";
import { useFormikContext } from "formik";

import { DimensionValue, TextInputProps } from "react-native";
import ErrorMessage from "./ErrorMessage";
import TextInput, { IconName } from "../TextInput";

interface Props extends TextInputProps {
  icon: IconName;
  name: string;
  width?: DimensionValue;
}

export default function FormField({ name, width, ...otherProps }: Props) {
  const { setFieldTouched, setFieldValue, errors, touched, values } =
    useFormikContext();

  return (
    <>
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
