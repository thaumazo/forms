"use client";

import { useCallback } from "react";

import { Grid } from "@mui/material";

import {
  ThemeProvider,
  Form,
  Provider,
  TextField,
  Password,
  ConfirmPassword,
  Checkbox,
  Select,
  Radio,
  Submit,
} from "/src";

const options = [
  ["first", "First"],
  ["second", "Second"],
  ["third", "Third"],
];

const initial = {
  checkbox: true,
  radio: "second",
};

export default function ManualForm() {
  const handleSubmit = useCallback((evt, { reset, setSubmitted }) => {
    // Simulate a form submission
    setTimeout(() => {
      setSubmitted(false);
      reset();
    }, 1000);
  }, []);

  return (
    <ThemeProvider theme="auto">
      <Provider>
        <Form values={initial} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField
                name="required"
                label="This field is required"
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField name="email" type="email" required />
            </Grid>
            <Grid item xs={6}>
              <Password autoComplete="new-password" />
            </Grid>
            <Grid item xs={6}>
              <ConfirmPassword
                label="Confirm password"
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
        </Form>
      </Provider>
    </ThemeProvider>
  );
}
