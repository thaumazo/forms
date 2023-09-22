import { useCallback, useRef, useEffect } from "react";

import useValue from "./useValue";
import useForm from "./useForm";

import Password from "./Password";

export default function ConfirmPassword({
  name = "password", // name of field to confirm
  pattern = null,
  message = "The passwords you entered don't match.",
  ...props
}) {
  const nameConfirm = "confirm_" + name;

  const inputRef = useRef();
  const [value] = useValue(name);
  const [valueConfirm] = useValue(nameConfirm);
  const { renderForm } = useForm();

  const handleChange = useCallback(() => {
    const input = inputRef.current;

    if (value !== input.value) {
      input.setCustomValidity(message);
    } else {
      input.setCustomValidity("");
    }
  }, [value, message]);

  const lastMatch = useRef();
  useEffect(() => {
    const match = value === valueConfirm;

    // If typing in the password field, we want to force the password field to update
    if (lastMatch.current !== match) {
      lastMatch.current = match;
      handleChange();
      renderForm();
    }
  }, [value, valueConfirm, renderForm, handleChange]);

  return (
    <Password
      name={nameConfirm}
      pattern={pattern}
      message={message}
      ref={inputRef}
      onChange={handleChange}
      {...props}
    />
  );
}
