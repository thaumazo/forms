
import React, { useCallback } from "react";
import useValue from "./useValue";

import MUICheckbox from "@mui/material/Checkbox";
import FormControlLabel from "@mui/material/FormControlLabel";

export default function Checkbox({ name, label }) {
  const [value, setValue] = useValue(name);

  const handleChange = useCallback(
    (evt) => {
      setValue(evt.target.checked);
    },
    [setValue],
  );

  return (
    <FormControlLabel
      control={
        <MUICheckbox
          checked={value || false}
          onChange={handleChange}
          name={name}
          color="primary"
        />
      }
      label={label}
    />
  );
}
