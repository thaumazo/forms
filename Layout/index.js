import Grid from "@mui/material/Grid"

import Group from "./Group"
import Fields from "./Fields"
import Form from "../Form";

export default function FormLayout(props) {
  const {groups = [], fields=[]} = props

  /*
  const fieldsGrouped = useMemo(() => fields.reduce((acc, field) => {
    const group = field.group || "_default";
    if (acc[group] === undefined) {
      acc[group] = [];
    }

    acc[group].push(field);
    return acc;
  }, {}), [fields]);
  */
  return (
    <Form>
      <Grid container>
        {Array.from(groups.values()).map(group => (
          <Group
            key={group.name}
            group={group}
            fields={group.fields}
          />
        ))}
        <Fields fields={ fields } />
      </Grid>
    </Form>
  )
}
