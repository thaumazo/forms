"use client";

import React from "react";

import MenuItem from "@mui/material/MenuItem";
import TextField from "./TextField";

export default function Select(props) {
  const { options = [], ...rest } = props;
  return (
    <TextField variant="filled" {...rest} select>
      {options.map(([value, label]) => {
        return (
          <MenuItem key={value} value={value}>
            {label}
          </MenuItem>
        );
      })}
    </TextField>
  );
}
