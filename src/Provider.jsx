"use client";

// Set which fields have errorsin a set. Trigger re render on form if set changes betweeon 0 and 1

import { useReducer, useRef, useMemo, useEffect } from "react";

const reducer = (count) => count + 1;

import { useFormState } from "react-dom";

import FormContext from "./Context";

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

export class GlobalFormState {
  #props = new Map();
  initialValues = null;
  fields = new Map();
  memo = 0; // updated to refresh memo

  set error(v) {
    throw Error("error is read only");
  }
  get error() {
    return this.state?.error;
  }

  set success(v) {
    throw Error("success is read only");
  }
  get success() {
    return this.state?.success;
  }

  set changedv(v) {
    throw Error("changed is read only");
  }
  get changed() {
    for (let [, field] of this.fields) {
      if (field.initialValue !== field.value) {
        return true;
      }
    }
    return false;
  }

  set invalid(v) {
    throw Error("invalid is read only");
  }
  get invalid() {
    for (let [, field] of this.fields) {
      if (field.checkValidity()) {
        return true;
      }
    }
    return false;
  }

  #state = {};
  set state(state) {
    if (!this.action && this.#state !== state) {
      this.reRender();
    }

    this.#state = state;
  }

  get state() {
    return this.#state;
  }

  constructor() {}

  init(initialValues) {
    this.fields.forEach((field, name) => {
      field.value = field.initialValue = initialValues[name] ?? "";
      field.blurred = false;
    });
  }

  reset() {
    this.init(this.initialValues);
  }

  initProp(name, initial) {
    this.#props.set(name, initial);

    Object.defineProperty(this, name, {
      get: function () {
        return this.#props.get(name);
      },
      set: function (value) {
        if (this.#props.get(name) !== value) {
          this.memo++;
          this.#props.set(name, value);
          this.reRender();
        }
      },
      enumerable: true,
      configurable: true,
    });
  }

  subscriptions = {};
  subscribe(fieldName, callback) {
    let set = this.subscriptions[fieldName];
    if (set === undefined) {
      set = this.subscriptions[fieldName] = new Set();
    }
    set.add(callback);
  }

  notifySubscribers(name) {
    const subscriptions = this.subscriptions[name];
    if (!subscriptions) {
      return false;
    }

    subscriptions.forEach((callback) => {
      callback();
    });
  }

  unsubscribe(fieldName, callback) {
    let set = this.subscriptions[fieldName];
    if (set) {
      set.delete(callback);
    }
  }
}
