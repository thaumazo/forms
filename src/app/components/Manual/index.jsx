"use client";

import Provider from "../../../Provider";

import Form from "./Form";
import action from "./action";

const initial = {
  required: "",
  checkbox: true,
  radio: "second",
};

export default function ManualFormWrapper() {
  return (
    <Provider values={initial} action={action}>
      <Form />
    </Provider>
  );
}
