import styles from "../page.module.css";

import ManualForm from "../components/Manual";

export const metadata = {
  title: "Form demo | Manual layout",
  description: "Thaumazo forms manual from layout",
};

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={styles.container}>
        <h2 className={styles.h1}> Manual layout </h2>
        <ManualForm />
      </div>
    </main>
  );
}
