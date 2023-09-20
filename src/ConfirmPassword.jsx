import { useCallback, useRef } from "react";

import useValue from "./useValue";
// import useBlur from "./useBlur";

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

  const handleChange = useCallback(
    (evt) => {
      const input = evt.target;

      if (value !== input.value) {
        input.setCustomValidity(message);
        inputRef.current.setCustomValidity(message);
      } else {
        input.setCustomValidity("");
      }
    },
    [value, message],
  );

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
