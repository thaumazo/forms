
import {
  // useReducer,
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import { useFormState } from "react-dom";

import FormContext from "./Context";

const empty = {};
export default function FormProvider({
  children,
  // id,
  values: initialValues = empty,
  action = null, // async function to be used in a server action
  result = "reset", // reset | clear | none | callback behaviour after a successful action
}) {
  const formRef = useRef();
  const [formState, formAction] = useFormState(action, {});

  const [values, setValues] = useState(initialValues);
  const [blurred, setBlurred] = useState({});
  const [changed, setChanged] = useState({});
  const [errors, setErrors] = useState({});
  const [invalid, setInvalid] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [toggleRender, setToggleRender] = useState(false);

  const init = useCallback(
    (values) => {
      setValues(values);

      setBlurred({});
      setChanged({});
      setErrors({});
      // setChanged(false);
      setInvalid(true);
      setSubmitted(false);
    },
    [setValues],
  );

  const reset = useCallback(() => {
    init(initialValues);
  }, [initialValues, init]);

  useEffect(() => {
    init(initialValues);
  }, [initialValues, init]);

  const checkValidity = useCallback(() => {
    if (!formRef.current) {
      return false;
    }

    return formRef.current.checkValidity();
  }, []);

  const setValue = useCallback(
    (name, value) => {
      const newValues = { ...values };
      newValues[name] = value;
      setValues(newValues);
      //dispatch({ type: "SET_FIELD", name, value });
    },
    [values, setValues],
  );

  const clear = useCallback(() => {
    // dispatch({ type: "CLEAR" });
    let form = { ...values };

    for (let key in form) {
      let val = form[key];
      if (typeof val === "boolean") {
        form[key] = false;
      } else {
        form[key] = "";
      }
    }

    setValues(form);
  }, [values, setValues]);

  // force the form to render so that side effects can be picked up on.
  const renderForm = useCallback(() => {
    setToggleRender(toggleRender === true ? false : true);
  }, [toggleRender, setToggleRender]);

  if (typeof formState !== "object") {
    throw Error("Invalid response received from server action");
  }

  const context = useMemo(
    () => ({
      // id,
      formRef,
      invalid,
      setInvalid,
      submitted,
      setSubmitted,
      checkValidity,
      isChanged: Object.keys(changed).length,
      // setChanged,
      // useValue,
      setValue,
      values,
      blurred,
      setBlurred,
      changed,
      setChanged,
      reset,
      init,
      clear,
      renderForm,
      initialValues,
      // setSuccess,
      // setError,
      error: formState.error,
      success: formState.success,
      formAction: action && formAction,
      formState: action && formState,
      result,
      errors,
      setErrors,
    }),
    [
      // id,
      invalid,
      submitted,
      values,
      blurred,
      changed,
      checkValidity,
      clear,
      init,
      reset,
      setValue,
      renderForm,
      initialValues,
      // notices,
      // setError,
      // setSuccess,
      formAction,
      formState,
      action,
      result,
      errors,
    ],
  );

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
}
