import React, { useCallback } from "react";
import useForm from "./useForm";

import useValue from "./useValue";

import MUIRadio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import FormControl from "@mui/material/FormControl";
import FormLabel from "@mui/material/FormLabel";
import FormControlLabel from "@mui/material/FormControlLabel";

import sentenceCase from "./utils/sentenceCase";

export default function Radio({
  label,
  name,
  row = false,
  disabled,
  options = [],
}) {
  const { initialValues, controlled } = useForm();

  if (label === undefined) {
    label = sentenceCase(name);
  }

  const [value, setValue] = useValue(name);
  const handleChange = useCallback(
    (evt) => {
      setValue(evt.target.value);
    },
    [setValue],
  );

  const groupProps = {};

  if (controlled) {
    groupProps.value = value || "";
    groupProps.onChange = handleChange;
  }

  if (name) {
    groupProps.defaultValue = initialValues[name] || "";
  }

  return (
    <FormControl component="fieldset">
      <FormLabel component="legend">{label}</FormLabel>
      <RadioGroup row={row} name={name} {...groupProps}>
        {options.map(([_value, _label]) => {
          return (
            <FormControlLabel
              key={_value}
              value={_value}
              control={<MUIRadio disabled={disabled} color="primary" />}
              label={_label}
              labelPlacement="end"
            />
          );
        })}
      </RadioGroup>
    </FormControl>
  );
}
