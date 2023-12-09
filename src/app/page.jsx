import styles from "./page.module.css";

import AutomaticForm from "./components/Automatic";

export const metadata = {
  title: "Form demo | Automatic layout",
  description: "Thaumazo forms automatic from layout",
};

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <AutomaticForm />
      </div>
    </main>
  );
}
