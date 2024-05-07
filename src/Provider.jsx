"use client";

// Set which fields have errorsin a set. Trigger re render on form if set changes betweeon 0 and 1

import { useReducer, useRef, useMemo, useEffect } from "react";

const reducer = (count) => count + 1;

import { useFormState } from "react-dom";

import FormContext from "./Context";
import GlobalFormState from "./lib/GlobalFormState";

const empty = {};
export default function FormProvider({
  children,
  values: initialValues = empty,
  disabled = false, // Disable entire form
  fieldProps = empty, // pass props to all fields
  noValidate: initialNoValidate = false,
  action = null, // async function to be used in a server action
  state: initialState = empty,
}) {
  const formRef = useRef();
  const [, reRender] = useReducer(reducer, 0);

  const form = useMemo(() => {
    const form = new GlobalFormState();
    form.reRender = reRender;
    form.ref = formRef;
    form.initialValues = initialValues;
    form.initProp("showErrors", false);
    form.initProp("pending", false);
    form.initProp("noValidate", initialNoValidate);
    form.initProp("disabled", disabled);
    form.initProp("fieldProps", fieldProps);
    return form;
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const [formState, formAction] = useFormState(action, initialState);
  form.action = action ? formAction : null;
  if (action) {
    form.state = formState;
  }
  form.initialState = initialState;
  form.disabled = disabled;
  form.fieldProps = fieldProps;

  const initialRender = useRef(false);
  useEffect(() => {
    // Need to put in this extra logic as useEffect fires twice in dev mode
    if (initialRender.current && initialRender.current !== initialValues) {
      form.init(initialValues);
    }
    initialRender.current = initialValues;
  }, [initialValues, form]);

  if (action && typeof form.state !== "object") {
    throw Error("Invalid response received from server action");
  }

  const context = useMemo(
    () => {
      return { form };
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      form,
      form.state,
      form.initialState,
      form.initialValues,
      form.memo,
      form.action,
      form.pending,
      form.showErrors,
    ],
  );

  return (
    <FormContext.Provider value={context}>{children}</FormContext.Provider>
  );
}

