"use client";

import useForm from "./useForm";
import { useCallback } from "react";

export default function useError(fieldName) {
  const { errors, setErrors } = useForm();

  const setError = useCallback(
    (value) => {
      if (errors[fieldName] === value) {
        return;
      }

      const newErrors = {
        ...errors,
        [fieldName]: value,
      };

      setErrors(newErrors);
    },
    [fieldName, errors, setErrors],
  );

  const error = errors[fieldName] || false;

  return [error, setError];
}
