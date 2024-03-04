import styles from "./page.module.css"
import { Button } from "@repo/ui"

export default function Page(): JSX.Element {
  return (
    <main className={styles.main}>
      <Button>Click me!</Button>
    </main>
  )
}
