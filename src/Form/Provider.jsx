import {
  useReducer,
  useState,
  useCallback,
  useRef,
  useMemo,
  useEffect,
} from "react";
import FormContext from "./Context";

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

const empty = {};
export default function FormProvider({
  children,
  id,
  values: initialValues = empty,
}) {
  const formRef = useRef();

  const [values, dispatch] = useReducer(reducer, initialValues);
  const [blurred, setBlurred] = useState({});
  const [invalid, setInvalid] = useState(true);
  const [submitted, setSubmitted] = useState(false);
  const [toggleRender, setToggleRender] = useState(false);

  const setValues = useCallback((values) => {
    dispatch({ type: "SET", values });
  }, []);

  const init = useCallback(
    (values) => {
      setValues(values);
      setBlurred({});
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

  const setValue = useCallback((name, value) => {
    dispatch({ type: "SET_FIELD", name, value });
  }, []);

  const clear = useCallback(() => {
    dispatch({ type: "CLEAR" });
  }, []);

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
    ],
  );

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
}
