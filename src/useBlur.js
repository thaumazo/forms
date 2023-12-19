import useForm from "./useForm";
import { useCallback } from "react";

export default function useBlur(fieldName) {
  const { blurred, setBlurred } = useForm();

  const setBlur = useCallback(
    (value) => {
      if (blurred[fieldName] === value) {
        return;
      }

      const newBlur = {
        ...blurred,
        [fieldName]: value,
      };

      setBlurred(newBlur);
    },
    [fieldName, blurred, setBlurred],
  );

  const blur = blurred[fieldName] || false;

  return [blur, setBlur];
}
