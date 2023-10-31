import { useRef, useEffect } from "react";
import Alert from "@mui/material/Alert";
import Fade from "@mui/material/Fade";

import useForm from "./useForm";

export default function Notice(props) {
  const { error, success } = useForm();
  const ref = useRef();

  const hasNotice = error || success;
  useEffect(() => {
    if (hasNotice && ref.current) {
      ref.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [hasNotice]);

  if (!hasNotice) {
    return null;
  }
  let severity = error ? "error" : "success";

  return (
    <Fade in={true}>
      <Alert ref={ref} severity={severity} {...props}>
        {error || success}
      </Alert>
    </Fade>
  );
}
