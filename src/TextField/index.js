import React, {useCallback, useState, useRef, useEffect} from "react"
import MUITextField from "@mui/material/TextField"
import checkValidity from "lib/checkValidity"
// import { makeStyles } from '@mui/material/styles';
import useForm from "useForm";
import useValue from "useValue";

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

export default function TextField(props) {
  const {name, select} = props;
  const {invalid, submitted, setValue} = useForm();
  const value = useValue(name)
  const [error, setError] = useState(null);
  let inputRef = useRef();
  inputRef = props.inputRef || inputRef;
  const {onBlur} = props;
  // const classes = useStyles()

  props = {
    fullWidth: true,
    ...props
  }

  const handleChange = useCallback(evt => {
    setValue(name, evt.target.value)
  }, [setValue, name])

  const handleBlur = useCallback((evt) => {
    if (onBlur) {
      onBlur(evt);
    }
    if (!select) {
      setError(checkValidity(evt.target));
    }
  }, [onBlur, select]);

  // The form was submitted and had an error somehwere. Display it if wehaveone
  useEffect(() => {
    if (invalid && submitted && !select) {
      setError(checkValidity(inputRef.current));
    }
  }, [invalid, submitted, inputRef, select]);

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
    <MUITextField
      value={value || ""}
      {...props}
      {...helperProps}
      onBlur={handleBlur}
      onChange={handleChange}
      inputRef={inputRef}
    />
  )
}
