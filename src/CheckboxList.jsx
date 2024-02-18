import React from "react";

import useField from "./useField";

import Checkbox from "./base/Checkbox";
import Field from "./Field";

import styles from "./form.module.scss";

export default function CheckboxList(props) {
  const inputRef = React.useRef();
  const field = useField(props, inputRef);

  let { row = false, options = [], name, ...rest } = field.props;

  return (
    <Field field={field}>
      <div className={styles["radioRow" + row] || null}>
        {options.map(([value, label], key) => {
          const id = field.props.id + "-" + value;
          value = String(value);
          return (
            <Checkbox
              key={value}
              row={row}
              name={name /*+ "[]"*/}
              value={value}
              ref={key === 0 ? inputRef : undefined}
              {...rest}
              id={id}
              checked={field?.value.includes(value)}
              label={label}
            />
          );
        })}
      </div>
    </Field>
  );
}
