"use client";

import useForm from "./useForm";
import { useCallback } from "react";

export default function useChange(fieldName) {
  const { changed, setChanged } = useForm();

  const setChange = useCallback(
    (value) => {
      if (changed[fieldName] === value) {
        return;
      }

      const newChanged = {
        ...changed,
        [fieldName]: value,
      };

      setChanged(newChanged);
    },
    [fieldName, changed, setChanged],
  );

  const change = changed[fieldName] || false;

  return [change, setChange];
}
