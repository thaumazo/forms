import { useRef, useEffect } from "react";
import { useFormStatus } from "react-dom";
import useForm from "./useForm";

export default function Submit() {
  const { reset, clear, result, init, setSubmitted, formState } = useForm();
  const { pending } = useFormStatus();
  const lastPending = useRef(false);

  // Detect form submission is complete and set submitted to false;
  useEffect(() => {
    if (pending === false && lastPending.current === true) {
      setSubmitted(false);
      if (formState?.success) {
        if (typeof result === "function") {
          result(formState);
        } else if (result === "reset") {
          if (formState?.values) {
            init(formState.values);
          } else {
            reset();
          }
        } else if (result === "clear") {
          clear();
        }
      }
    }

    lastPending.current = pending;
  }, [pending, init, reset, clear, result, setSubmitted, formState]);

  return null;
}
