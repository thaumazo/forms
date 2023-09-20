import Grid from "@mui/material/Grid";
import pick from "lodash/pick";
import Fields from "./Fields";

export default function Group(props) {
  const { group, fields } = props;
  const gridProps = pick(group, ["lg", "md", "sm", "xl", "xs"]);
  const label = group.label || group.name;

  if (!fields || fields.length === 0) {
    return null;
  }

  return (
    <Grid item {...gridProps}>
      {label}
      <Fields fields={fields} />
    </Grid>
  );
}
