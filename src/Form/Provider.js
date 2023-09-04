import { useState, useCallback, useRef, useMemo, useEffect } from "react"
import FormContext from "./Context"

export default function FormProvider({children, id, values: initialValues}) {
  const formRef = useRef()

  const [isChanged, setChanged] = useState(false);
  const [values, setValues] = useState(initialValues);
  const [invalid, setInvalid] = useState(true);
  const [submitted, setSubmitted] = useState(false);
 
  const init = useCallback((values) => {
    setValues(values);
    setChanged(false);
    setInvalid(true);
    setSubmitted(false);
  }, []);

  const reset = useCallback(() => {
    init(initialValues)
  }, [initialValues]);

  useEffect(() => {
    init(initialValues)
  }, [initialValues])

  const getValues = useCallback(() => {
    return values;
  }, [values])

  const checkValidity = useCallback(() => {
    if (!formRef.current) {
      return false
    }

    return formRef.current.checkValidity()
  }, [])

  const setValue = useCallback((fieldName, value) => {
    if (values[fieldName] === value) {
      return;
    }

    const newValues = {
      ...values,
      [fieldName]: value,
    }

    setValues(newValues);
    setChanged(true);   
  }, [values]);


  const clear = useCallback(() => {
    let form  = {...values}
    for (let key in form) {
      let val = form[key];
      if (typeof(val) === "boolean") {
        form[key] = false;
      } else {
        form[key] = ""
      }
    }

    setValues(values);
  }, [values]);

  const context = useMemo(() => ({
    id,
    formRef,
    invalid,
    setInvalid,
    submitted,
    setSubmitted,
    checkValidity,
    isChanged,
    setChanged,
    getValues,
    // useValue,
    setValue,
    values,
    reset,
    init,
    clear,
  }), [id, invalid, submitted, values]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <FormContext.Provider value={context}>
      {children}
    </FormContext.Provider>
  )
}
