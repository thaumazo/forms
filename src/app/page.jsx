import styles from './page.module.css'

import ManualForm from "./components/Manual"
import AutomaticForm from "./components/Automatic"

export default function Home() {
  return (
    <main className={styles.main}>
      <div className={ styles.container }>
        <h2 className={ styles.h1 }> Manual layout </h2>
        <ManualForm />
        <h2 className={ styles.h1 }> Automatic layout </h2>
        <AutomaticForm />
      </div>
    </main>
  )
}
