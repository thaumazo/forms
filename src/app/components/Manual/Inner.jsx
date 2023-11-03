"use client";

import { Grid } from "@mui/material";

import {
  TextField,
  Password,
  Checkbox,
  Select,
  Radio,
  Submit,
  Notice,
} from "/src";

const options = [
  ["first", "First"],
  ["second", "Second"],
  ["third", "Third"],
];

export default function ManualFormInner() {
  return (
    <>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Notice />
        </Grid>
        <Grid item xs={12}>
          <TextField name="required" label="This field is required" required />
        </Grid>
        <Grid item xs={12}>
          <TextField name="email" type="email" required />
        </Grid>
        <Grid item xs={6}>
          <Password autoComplete="new-password" />
        </Grid>
        <Grid item xs={6}>
          <Password
            label="Confirm password"
            name="confirm_passwore"
            matches="password"
            autoComplete="new-password"
          />
        </Grid>
        <Grid item xs={12}>
          <Select name="select" label="Choose" options={options} />
        </Grid>
        <Grid item xs={12}>
          <Checkbox name="checkbox" label="Checkbox" />
        </Grid>
        <Grid item xs={12}>
          <Radio row name="radio" label="Radio" options={options} />
        </Grid>
      </Grid>
      <Submit />
    </>
  );
}
