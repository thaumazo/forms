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
      <ul className={row ? (styles["radioRow" + row] || null) : styles.radioList }>
        {options.map(([value, label], key) => {
          const id = field.props.id + "-" + value;
          value = String(value);
          return (
            <li>
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
            </li>
          );
        })}
      </ul>
    </Field>
  );
}
