import React, { forwardRef } from "react";

import useField from "./useField";

import Field from "./Field";
import Input from "./base/Input";

const TextField = ({ start, end, ...initialProps }, ref) => {
  const field = useField(initialProps, ref);

  return (
    <Field field={field}>
      <Input
        {...field.props}
        value={field.value}
        start={start}
        end={end}
        ref={field.ref}
      />
    </Field>
  );
  /*
  const input = (
    <input
      type="text"
      {...field.props}
      className={start || end ? null : styles.input}
      value={field.value}
      ref={field.ref}
    />
  );

  return (
    <div className={styles.field}>
      <Label field={field} className={styles.mb} />
      {start || end ? (
        <label className={styles.labelInput}>
          {start && <span className={styles.start}>{start}</span>}
          {input}
          {end && <span className={styles.end}>{end}</span>}
        </label>
      ) : (
        input
      )}
      <Error field={field} />
    </div>
  );
  */
};

TextField.displayName = "TextField";
export default forwardRef(TextField);
