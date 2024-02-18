"use client";

import FormControlLabel from "@mui/material/FormControlLabel";
import Switch from "@mui/material/Switch";

import useForm from "../../../useForm";

export default function ToggleValidity() {
  const form = useForm();

  const handleChange = (evt) => {
    form.noValidate = evt.target.checked ? false : true;
  };

  return (
    <FormControlLabel
      control={
        <Switch
          checked={form.noValidate ? false : true}
          onChange={handleChange}
        />
      }
      label="Disable client side validation to test server side validation"
    />
  );
}
