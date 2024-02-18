import React, { forwardRef } from "react";

import CircleIcon from "../icons/Circle";

import styles from "../form.module.scss";

function Radio({ label, id, row, ...props }, ref) {
  return (
    <div className={styles.flex + " " + styles["option" + row] || ""}>
      <label className={styles.radio}>
        <input {...props} ref={ref} id={id} type="radio" />
        <span>
          <CircleIcon width="0.875rem" height="0.875rem" />
        </span>
      </label>
      <label className={styles.label} htmlFor={id}>
        {label}
      </label>
    </div>
  );
}

// Radio.displayName = "Radio";
export default forwardRef(Radio);
