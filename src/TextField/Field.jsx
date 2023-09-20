import { memo } from "react"
import TextField from "@mui/material/TextField"

function TextFieldWrapper(props) {
  return <TextField {...props } />
}

const TextFieldMemo = memo(TextFieldWrapper);

export default TextFieldMemo;

