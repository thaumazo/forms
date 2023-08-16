import useForm from "./useForm";

import Button from '@mui/material/Button';

export default function Submit({ disabled, children="Submit" }) {
  const { invalid } = useForm();

  return (
    <Button
      type="submit"
      variant="contained"
      size="large"
      disabled={ disabled || invalid }
    >
      { children }
    </Button>
  )
}
