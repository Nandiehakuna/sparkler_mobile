import React, { PropsWithChildren } from "react";
import { Formik, FormikHelpers } from "formik";

interface Props extends PropsWithChildren {
  initialValues: object;
  onSubmit: (values: object, formikHelpers: FormikHelpers<object>) => void;
  validationSchema: object;
}

export default function Form({
  initialValues,
  onSubmit,
  validationSchema,
  children,
}: Props) {
  return (
    <Formik
      initialValues={initialValues}
      onSubmit={onSubmit}
      validationSchema={validationSchema}
    >
      {() => <>{children}</>}
    </Formik>
  );
}
