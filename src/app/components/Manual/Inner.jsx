"use client";

import Grid from "../../../Grid";
import Item from "../../../Grid/Item";

//import { Grid } from "@mui/material";

import TextField from "../../../Input";
import Password from "../../../Password";
import Checkbox from "../../../Checkbox";
import Select from "../../../Select";
import Radio from "../../../Radio";
import Submit from "../../../Submit";
import Notice from "../../../Notice";

const options = [
  ["first", "First"],
  ["second", "Second"],
  ["third", "Third"],
];

export default function ManualFormInner() {
  return (
    <>
      <Grid gap="1rem">
        <Item>
          <Notice />
        </Item>
        <Item>
          <TextField name="required" label="This field is required" required />
        </Item>
        <Item>
          <TextField name="email" type="email" required />
        </Item>
        <Item sm={6}>
          <Password name="password" autoComplete="new-password" />
        </Item>
        <Item sm={6}>
          <Password
            label="Confirm password"
            name="confirm_passwore"
            matches="password"
            autoComplete="new-password"
          />
        </Item>
        <Item>
          <Select name="select" label="Choose" options={options} />
        </Item>
        <Item>
          <Checkbox name="checkbox" label="Checkbox" />
        </Item>
        <Item>
          <Radio row name="radio" label="Radio" options={options} />
        </Item>
      </Grid>
      <Submit />
    </>
  );
}
