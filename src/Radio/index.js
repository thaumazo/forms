import React, {useCallback} from "react";

import useForm from "../useForm";
import useValue from "../useValue";


import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import FormControlLabel from '@mui/material/FormControlLabel';
import RadioGroup from '@mui/material/RadioGroup';
import MUIRadio from '@mui/material/Radio';

import sentenceCase from "../utils/sentenceCase"

export default function Radio({
  label, 
  name, 
  row=false,
  disabled, 
  options = [], 
}) {

  if (label === undefined) {
    label = sentenceCase(name);
  }

  const {setValue} = useForm();
  const value = useValue(name);
  const handleChange = useCallback((evt) => {
    setValue(name, evt.target.value);
  }, [name, setValue]);
  
  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{ label }</FormLabel>
      <RadioGroup 
        row={row}
        name={name}
        value={value}
        onChange={handleChange}
      >
        {options.map(([_value, _label]) => {
          return (
            <FormControlLabel
              key={_value}
              value={_value}
              control={(
                <MUIRadio 
                  disabled={disabled}
                  color="primary" 
                />)}
              label={_label}
              labelPlacement="end"
            />
          )
        })}
      </RadioGroup> 
    </FormControl>
  )
}
