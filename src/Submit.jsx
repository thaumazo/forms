import useForm from "./useForm";

import { Button } from "@mui/material";
import { useFormStatus } from "react-dom";

export default function Submit({
  disabled,
  mode = "nonde", // valid | none
  variant = "contained",
  size = "large",
  children = "Submit",
  ...props
}) {
  const { invalid } = useForm();
  const { pending } = useFormStatus();

  if (mode === "valid") {
    disabled = invalid;
  }

  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      disabled={pending || disabled}
      {...props}
    >
      {children}
    </Button>
  );
}
