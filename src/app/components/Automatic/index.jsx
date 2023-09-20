'use client'

import { ThemeProvider, Layout } from "src"

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
  }  
]


export default function AutomaticLayout() {
  return (
    <ThemeProvider theme="auto">
      <Layout fields={ fields }/>
    </ThemeProvider>
  )
}
