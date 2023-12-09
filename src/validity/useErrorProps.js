import { useMemo, useEffect } from "react";

import useForm from "../useForm";
import useError from "../useError";
import useBlur from "../useBlur";

import checkInputValidity from "./checkInputValidity";

export default function useErrorProps(props, inputRef) {
  const { name } = props;
  const { noValidate, formState, values, submitted } = useForm();
  const [error, setError] = useError(name);
  const [blur] = useBlur(name);

  const serverErrors = formState?.fieldErrors || {};
  const errorMessage = serverErrors[name] || (noValidate ? "" : error);

  useEffect(() => {
    if (blur || submitted) {
      const input = inputRef.current;
      const err = checkInputValidity(input, props, values);
      setError(err);
    }
  }, [props, blur, submitted, values, setError, inputRef]);

  return useMemo(() => {
    let helperProps = {};
    if (errorMessage) {
      helperProps = {
        helperText: errorMessage,
        FormHelperTextProps: {
          error: true,
          // className: classes.addHelperText,
        },
      };
    }
    return helperProps;
  }, [errorMessage]);
}
