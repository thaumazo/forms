import {
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import FormContext from "./Context";

/*
const reducer = (state, action) => {
  switch (action.type) {
    case "SET_FIELD": {
      const { name, value } = action;
      if (state[name] === value) {
        return state;
      }

      const newState = {
        ...state,
        [name]: value,
      };

      return newState;
      // setChanged(true);
    }
    case "SET": {
      const { values } = action;
      return values;
    }
    case "CLEAR": {
      let form = { ...state };
      for (let key in form) {
        let val = form[key];
        if (typeof val === "boolean") {
          form[key] = false;
        } else {
          form[key] = "";
        }
      }

      return form;
    }
    default:
      return state;
  }
};
*/

const empty = {};
export default function FormProvider({
  children,
  id,
  values: initialValues = empty,
  controlled = false, //whether or not the form components are controlled
}) {
  const formRef = useRef();

  const [values, setValues] = useState(controlled ? initialValues : {});
  const [blurred, setBlurred] = useState({});
  const [invalid, setInvalid] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [toggleRender, setToggleRender] = useState(false);

  const init = useCallback(
    (values) => {
      if (controlled) {
        setValues(values);
      } else {
        formRef.current.reset();
      }
      setBlurred({});
      // setChanged(false);
      setInvalid(true);
      setSubmitted(false);
    },
    [setValues, controlled, formRef],
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
    if (!controlled) {
      formRef.current.clear();
      return;
    }
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
  }, [controlled, values, setValues]);

  // force the form to render so that side effects can be picked up on.
  const renderForm = useCallback(() => {
    setToggleRender(toggleRender === true ? false : true);
  }, [toggleRender, setToggleRender]);

  const isChanged = values !== initialValues;

  const context = useMemo(
    () => ({
      id,
      formRef,
      invalid,
      setInvalid,
      submitted,
      setSubmitted,
      checkValidity,
      isChanged,
      // setChanged,
      // useValue,
      setValue,
      values,
      blurred,
      setBlurred,
      reset,
      init,
      clear,
      renderForm,
      controlled,
      initialValues,
    }),
    [
      id,
      invalid,
      submitted,
      values,
      blurred,
      checkValidity,
      clear,
      init,
      isChanged,
      reset,
      setValue,
      renderForm,
      controlled,
      initialValues,
    ],
  );

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
}
