import React, { forwardRef } from "react";

import CheckIcon from "@heroicons/react/24/outline/CheckIcon";

import styles from "../form.module.scss";

function Checkbox({ label, id, row, ...props }, ref) {
  return (
    <div
      className={
        styles.flex + " " + styles.flexWra + " " + styles["option" + row] || ""
      }
    >
      <label className={styles.checkbox}>
        <input {...props} id={id} type="checkbox" ref={ref} />
        <span>
          <CheckIcon width="0.874rem" height="0.874rem" />
        </span>
      </label>
      {label && (
        <label htmlFor={id} className={styles.label}>
          {label}
        </label>
      )}
    </div>
  );
}

// Checkbox.displayName = "Checkbox";
export default forwardRef(Checkbox);
