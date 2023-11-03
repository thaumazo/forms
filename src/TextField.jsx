"use client";

import React, {
  useMemo,
  useCallback,
  useState,
  useRef,
  forwardRef,
  useEffect,
} from "react";

import isEmail from "validator/es/lib/isEmail";

// import Field from "./Field";
import TextFieldMUI from "@mui/material/TextField";

import checkValidity from "./lib/checkValidity";
import useForm from "./useForm";
import useValue from "./useValue";
import useBlur from "./useBlur";
import useChange from "./useChange";
import useError from "./useError";

import sentenceCase from "./utils/sentenceCase";

const TextField = (
  {
    label,
    pattern,
    message,
    onChange,
    matches, // field matched for validation
    ...props
  },
  extRef,
) => {
  const { name, select, type } = props;

  if (label === undefined) {
    label = sentenceCase(name);
  }

  const { formState, submitted, initialValues } = useForm();
  const [formValue, setFormValue] = useValue(name);
  const [matchValue] = useValue(matches);
  const [value, setValue] = useState(formValue);

  // Keep track if field has been blurred to know if we should display errors
  const [blur, setBlur] = useBlur(name);
  const [, setChange] = useChange(name);
  const [error, setError] = useError(name);
  // const [error, setError] = useState(null);
  const intRef = useRef();
  const inputRef = extRef || intRef;

  const { onBlur } = props;
  // const classes = useStyles()

  props = {
    fullWidth: true,
    ...props,
  };

  const inputProps = useMemo(
    () => ({
      pattern,
    }),
    [pattern],
  );

  const handleChange = useCallback(
    (evt) => {
      if (onChange) {
        onChange(evt);
      }

      const input = evt.target;
      setValue(input.value);
    },
    [setValue, onChange],
  );

  const handleBlur = useCallback(
    (evt) => {
      if (onBlur) {
        onBlur(evt);
      }

      setFormValue(value);

      if (select) {
        return;
      }

      setBlur(true);
      setChange(initialValues[name] !== value);
      setError(checkValidity(evt.target, message));
    },
    [
      onBlur,
      select,
      message,
      initialValues,
      value,
      setError,
      name,
      setFormValue,
      setBlur,
      setChange,
    ],
  );

  // const validationMessage = inputRef?.current?.validationMessage;

  const initialRender = useRef;

  useEffect(() => {
    setValue(formValue);
  }, [formValue]);

  // apply side effects when form submission is attempted.
  useEffect(() => {
    /*
    if (!initialRender.current) {
      initialRender.current = true;
      return;
    }
    */

    if (select) {
      return;
    }

    const input = inputRef.current;

    // Custom validation for email
    if (type === "email") {
      if (!isEmail(value)) {
        let msg = message || "Please enter a valid email address";
        input.setCustomValidity(msg);
      } else {
        input.setCustomValidity(""); // clear any prior message
      }
    }

    if (matches) {
      if (value !== matchValue) {
        input.setCustomValidity(
          message || "he passwords you entered don't match.",
        );
      } else {
        input.setCustomValidity("");
      }
    }

    if (blur || submitted) {
      const err = checkValidity(input, message);
      setError(err);
    }
  }, [
    inputRef,
    select,
    blur,
    submitted,
    matchValue,
    value,
    matches,
    type,
    setError,
    // validationMessage,
    initialRender,
    message,
  ]);

  const serverErrors = formState?.fieldErrors || {};
  const errorMessage = serverErrors[name] || error;

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

  return (
    <TextFieldMUI
      value={value || ""}
      label={label}
      {...props}
      {...helperProps}
      onBlur={handleBlur}
      onChange={handleChange}
      inputRef={inputRef}
      inputProps={inputProps}
    />
  );
};

TextField.displayName = "TextField";
export default forwardRef(TextField);
