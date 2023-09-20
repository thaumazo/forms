import { useState, useCallback, forwardRef } from "react"
import TextField from "./TextField"
import IconButton from '@mui/material/IconButton';
import InputAdornment from '@mui/material/InputAdornment';


import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';

const Password = forwardRef(({
  pattern="(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)[\\S]{8,}",
  message="Must be at least 8 characters; include both big and small letters and a number.",
  name="password",
  ...props
}, ref) => {
  const [showPassword, setShowPassword] = useState(false);

  const handleClickShowPassword = useCallback(() => {
    setShowPassword(showPassword ? false : true);
  }, [showPassword]);

 props.InputProps={ 
    endAdornment: (
      <InputAdornment position="end">
        <IconButton
          aria-label="toggle password visibility"
           onClick={handleClickShowPassword}
          // onMouseDown={handleMouseDownPassword}
        >
          {showPassword ? <VisibilityOff /> : <Visibility />}
        </IconButton>
      </InputAdornment>
    )
  }

  return (
    <TextField
      pattern={ pattern }
      message={ message }
      name={ name }
      type={ showPassword ? "text" : "password" }
      ref={ ref }
      { ...props }
    />
  )
})

Password.displayName = "Password"
export default Password
