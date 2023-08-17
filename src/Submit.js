import useForm from "./useForm";

import { Button } from '@mui/material';

export default function Submit({ 
  disabled,
  variant="contained",
  size="large",
  children = "Submit",
  ...props
}) {

  const { invalid } = useForm();

  if (disabled === undefined) {
    disabled = invalid
  }

  return (
    <Button
      type="submit"
      variant={ variant }
      size={ size }
      disabled={ disabled }
      { ...props }
    >
      { children }
    </Button>
  )
}
