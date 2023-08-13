import React, {useCallback} from "react";
import useForm from "../useForm";
import useValue from "../useValue";

import FormControlLabel from '@mui/material/FormControlLabel';
import MUICheckbox from '@mui/material/Checkbox';

export default function Radio({name, label}) {
  const {setValue} = useForm();
  const value = useValue(name);
  const handleChange = useCallback((evt) => {
    setValue(name, evt.target.checked);
  }, [name, setValue]);
  
  return (
    <FormControlLabel
      control={(
        <MUICheckbox 
          checked={value}
          onChange={handleChange}
          name={name}
          color="primary"
        />
      )}
      label={label}
    />
  )
}
