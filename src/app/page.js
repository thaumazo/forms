import styles from './page.module.css'

import ManualForm from "./components/Manual"
import AutomaticForm from "./components/Automatic"

export default function Home() {
  return (
    <main className={styles.main}>
      <h1> Manual layout </h1>
      <ManualForm />
      <h1> Automatic layout </h1>
      <AutomaticForm />
    </main>
  )
}
