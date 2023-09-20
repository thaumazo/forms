import useForm from "./useForm";

import { Button } from "@mui/material";

export default function Submit({
  disabled,
  variant = "contained",
  size = "large",
  children = "Submit",
  ...props
}) {
  const { invalid, submitted } = useForm();

  if (disabled === undefined) {
    disabled = invalid || submitted;
  }

  return (
    <Button
      type="submit"
      variant={variant}
      size={size}
      disabled={disabled}
      {...props}
    >
      {children}
    </Button>
  );
}
