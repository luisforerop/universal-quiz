import { useScreensContext } from '../../shared/providers'
import styles from './Home.module.css'

export const Home = () => {
  const { currentScreen } = useScreensContext()

  return (
    <div className={styles.home}>
      <div className={styles.homeContainer}>
        <h1>Universal Quiz</h1>
        <h2>Juega ahora</h2>
      </div>
      <div className={styles.homeContainer}>
        <button
          onClick={() => {
            currentScreen.set('questions')
          }}
        >
          Juega Ahora!
        </button>
      </div>
    </div>
  )
}
