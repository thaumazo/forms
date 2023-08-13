import valueReducer from "./valueReducer"
import { useState, useCallback, useRef, useMemo } from "react"
import { createStore } from "redux";
import { Provider } from "react-redux";
import FormContext from "./Context"

export default function FormProvider({children, name = "form", id, values: initialValues}) {
  const formRef = useRef()

  const store = useMemo(() => {
    return createStore(valueReducer, {
      changes: false,
      form: initialValues || {}, 
    })
    
  }, [initialValues]);

  const [invalid, setInvalid] = useState(true);
  const [submitted, setSubmitted] = useState(false);

  const isChanged = useCallback(() => {
    const s = store.getState()
    return s[name].changed
  }, [name, store])

  const setChanged = useCallback((changed) => {
    store.dispatch({
      name,
      type: "set-changed",
      payload: changed
    })
  }, [name, store])

  const getValues = useCallback(() => {
    const s = store.getState()
    return s.form
  }, [/*name, */ store])

  const checkValidity = useCallback(() => {
    if (!formRef.current) {
      return false
    }

    return formRef.current.checkValidity()
  }, [])

  const setValue = useCallback((fieldName, value) => {
    store.dispatch({
      name,
      type: "set-field",
      payload: {
        name: fieldName, 
        value
      }
    })
  }, [name, store]);

  const context = useMemo(() => ({
    id,
    name,
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
  }), [id, invalid, submitted, name]) // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <Provider store={store}>
      <FormContext.Provider value={context}>
        {children}
      </FormContext.Provider>
    </Provider>
  )
}
