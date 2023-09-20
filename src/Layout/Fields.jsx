import { Grid } from "@mui/material"
import Field from "./Field"

export default function Fields(props) {
  const {fields} = props;

  if (!fields) {
    return null;
  }

  const fieldList = Array.isArray(fields) ? fields : []; //Array.from(fields.values());

  return (
    <Grid container spacing={2}>
      {fieldList.map(field => (
        <Field
          key={field.name}
          field={field}
        />
      ))}
    </Grid>
  )
}
