import React, {useMemo, useCallback, useState, useRef, forwardRef} from "react"

import isEmail from 'validator/lib/isEmail';

import Field from "./Field"
import checkValidity from "../lib/checkValidity"
// import { makeStyles } from '@mui/material/styles';
import useForm from "../useForm";
import useValue from "../useValue";
import useBlur from "../useBlur";

import sentenceCase from "../utils/sentenceCase"
/*
const useStyles = makeStyles(theme => ({
  root: {
    minWidth: '12rem',
    marginBottom: theme.spacing(1),
  },
  addHelperText: {
    position: 'absolute',
    top: '100%',
    margin: '0',
    marginTop: '2px',
  }
}));
*/

const TextField = forwardRef(({
  label,
  pattern,
  message,
  onChange,
  ...props
}, extRef) => {
  const {name, select, type} = props;

  if (label === undefined) {
    label = sentenceCase(name);
  }

  const {submitted } = useForm();
  const [value, setValue] = useValue(name)

  // Keep track if field has been blurred to know if we should display errors
  const [blur, setBlur] = useBlur(name)
  const [error, setError] = useState(null);
  const intRef = useRef();
  const inputRef = extRef || intRef;
 
  const {onBlur} = props;
  // const classes = useStyles()

  props = {
    fullWidth: true,
    ...props
  }

  const inputProps = useMemo(() => ({
    pattern
  }), [pattern])

  const handleChange = useCallback(evt => {
    if (onChange) {
      onChange(evt);
    }

    const input = evt.target
    const value = input.value;
    setValue(value)

    // Custom validation for email
    if (type === "email") {
      if (!isEmail(value)) {
        let msg = message || "Please enter a valid email address";
        input.setCustomValidity(msg);
      } else {
        input.setCustomValidity(""); // clear any prior message
      }
    }

    if ((blur || submitted) && !select) {
      const err = checkValidity(input, message);
      setError(err);
    }

  }, [setValue, blur, submitted, message, onChange, select, type])

  const handleBlur = useCallback((evt) => {
    if (onBlur) {
      onBlur(evt);
    }
    if (!select) {
      setBlur(true);
      setError(checkValidity(evt.target, message));
    }
  }, [onBlur, select, message, setBlur]);

  // The form was submitted and had an error somehwere. Display it if wehaveone
/*
  useEffect(() => {
 
  }, [error, value, blur, invalid, submitted, inputRef, select, message, type]);
*/

  let helperProps = {}
  if (error) {
    helperProps = {
      helperText: error,
      FormHelperTextProps: {
        error: true,
        // className: classes.addHelperText,
      },
    }
  }

  return (
    <Field
      value={value || ""}
      label={ label }
      {...props}
      {...helperProps}
      onBlur={handleBlur}
      onChange={handleChange}
      inputRef={inputRef}
      inputProps={ inputProps }
    />
  )
})

TextField.displayName = 'TextField';
export default TextField
