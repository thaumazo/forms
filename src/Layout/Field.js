import {memo, useMemo} from "react"
import sentenceCase from "../utils/sentenceCase"

import Grid from "@mui/material/Grid"
import pick from "lodash/pick"
import TextField from "../TextField"

function Field({field}) {
  const gridProps = pick(field, ['lg', 'md', 'sm', 'xl', 'xs']);

  const fieldProps = useMemo(() => {
    let retval = pick(field, [
      'name',
      'value',
      'label',
      'max',
      'min',
      'pattern',
      'placeholder',
      'required',
      'type',
    ]);

    if (!('label' in retval)) {
      retval.label = sentenceCase(field.name);
    }

    return retval
  }, [field])

  return (
    <Grid item {...gridProps}>
      <TextField fullWidth {...fieldProps}/>
    </Grid>
  )
}

export default memo(Field)
