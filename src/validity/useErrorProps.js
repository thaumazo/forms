import { useMemo } from "react";

import useForm from "../useForm";
// import useError from "../useError";

export default function useErrorProps(props, field) {
  const { name } = props;
  const form = useForm();

  /*
  useEffect(() => {
    if (field.blurred || form.showErrors) {
      const input = inputRef.current;
      const err = checkInputValidity(input, props, form);
      setError(err);
    }
  }, [props, field.blurred, field.value, form.showErrors, form, setError, inputRef]);
  */

  let error;
  if (form.noValidate == false && (field.blurred || form.showErrors)) {
    error = field.checkValidity();
  }
  const serverErrors = form.state?.fieldErrors || {};
  const errorMessage = serverErrors[name] || error;

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
