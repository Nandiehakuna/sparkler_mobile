import React from "react";
import { useFormikContext } from "formik";

import AppButton from "../Button";

export default function SubmitButton({ title }) {
  const { handleSubmit } = useFormikContext();

  return <AppButton title={title} onPress={handleSubmit} />;
}
