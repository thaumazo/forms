"use client";

import { ThemeProvider, Provider } from "/src";

import Form from "./Form";
import action from "./action";

const initial = {
  required: "",
  checkbox: true,
  radio: "second",
};

export default function ManualFormWrapper() {
  return (
    <ThemeProvider theme="auto">
      <Provider values={initial} action={action}>
        <Form />
      </Provider>
    </ThemeProvider>
  );
}
