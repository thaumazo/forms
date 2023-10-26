import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";

import useForm from "./useForm";

export default function Notice(props) {
  const { error, success } = useForm();

  if (!error && !success) {
    return null;
  }
  let severity = error ? "error" : "success";

  return (
    <Fade in={true}>
      <Alert severity={severity} {...props}>
        {error || success}
      </Alert>
    </Fade>
  );
}
