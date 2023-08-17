
'use client'

import { Grid } from '@mui/material';


import { ThemeProvider, Form, TextField, Checkbox, Select, Radio, Submit } from "src";

const options = [
  ['first', 'First'],
  ['second', 'Second'],
  ['third', 'Third'],
]

const initial = {
  checkbox: true,
  radio: "second",
}

export default function ManualForm() {
  return (
    <ThemeProvider theme="auto">
      <Form values={ initial }>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField name="required" label="This field is required" required />
          </Grid>
          <Grid item xs={12}>
            <Checkbox name="checkbox" label="Checkbox" />
          </Grid>
          <Grid item xs={12}> 
            <Select name="select" label="Choose" options={ options }/>
          </Grid>
          <Grid item xs={12}>
            <Radio name="radio" label="Radio" options={ options }/>
          </Grid>
        </Grid>
        <Submit />
      </Form>
    </ThemeProvider>
  )
}
