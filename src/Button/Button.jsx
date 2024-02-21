import { lazy, Suspense } from "react";

import styles from "./button.module.scss";

//const Spinner = lazy(() => import("./Spinner"));

const Spinner = lazy(() => import("@mui/icons-material/Autorenew"));


export default function Button({
  loading = null,
  startIcon = null,
  endIcon = null,
  className = null,
  children,
  type = "button",
  color = null,
  component: Component = "button",
  ...props
}) {
  let classes = styles.button;


  if (loading === true || (loading === false && !startIcon) ) {
    if (loading === true) {
      props.disabled = true;
    }
    classes += " " + styles.loading;
    startIcon = (
      <Suspense>
        <Spinner 
          className={styles.spinner}
          style={{ visibility: loading ? "visible" : "hidden" }}
        />
      </Suspense>
    );
  }

  if (loading !== null && !endIcon) {
    endIcon = <span />
  }

  if (startIcon) {
    classes += " " + styles.startIcon;
    /*
    if (typeof startIcon === "function") {
      const StartIcon = lazy(startIcon);
      startIcon = (
        <Suspense>
          <StartIcon />
        </Suspense>
      );
    }
    */
  }

  switch (color) {
    case "error":
      classes += " " + styles.error;
      break;
  }

  if (endIcon) {
    classes += " " + styles.endIcon;
  }

  if (className) {
    classes += " " + className;
  }

  return (
    <Component type={type} className={classes} {...props}>
      {startIcon && <span className={styles.startIconSpan}>{startIcon}</span>}
      {children}
      {endIcon && <span className={styles.endIconSpan}>{endIcon}</span>}
    </Component>
  );
}
