"use client";

import { ThemeProvider, Provider, Layout } from "/src";

const fields = [
  {
    name: "first_name",
    required: true,
    xs: 6, // grid spacing
  },
  {
    name: "last_name",
    required: true,
    xs: 6, // grid spacing
  },
];

export default function AutomaticLayout() {
  return (
    <ThemeProvider theme="auto">
      <Provider>
        <Layout fields={fields} />
      </Provider>
    </ThemeProvider>
  );
}
