
import { useCallback } from "react";
import useForm from "./useForm";

export default function useValue(fieldName) {
  const { values, setValue } = useForm();

  const setFieldValue = useCallback(
    (value) => {
      setValue(fieldName, value);
    },
    [setValue, fieldName],
  );

  return [values[fieldName] || "", setFieldValue];
}
