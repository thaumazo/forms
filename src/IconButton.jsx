import styles from "./Button/button.module.scss";

export default function IconButton({ children, className = "", ...props }) {
  return (
    <button
      className={styles.iconButton + (className ? " " + className : "")}
      {...props}
    >
      {children}
    </button>
  );
}
