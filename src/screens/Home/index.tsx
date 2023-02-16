import { useState } from 'react'

import { useQuestionsContext, useScreensContext } from '../../shared/providers'
import styles from './Home.module.css'

export const Home = () => {
  const { currentScreen } = useScreensContext()
  const { source } = useQuestionsContext()

  const [url, setUrl] = useState('')
  const [error, setError] = useState<null | string>(null)

  return (
    <div className={styles.home}>
      <div className={styles.homeContainer}>
        <h1>Universal Quiz</h1>
        <h2>Juega ahora</h2>
      </div>
      <div className={styles.homeContainer}>
        <input
          type="text"
          placeholder="Url de las preguntas"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        {error}
        <button
          onClick={() => {
            if (url) {
              source.setUrl(url)
              currentScreen.set('questions')
              setError(null)
            } else {
              setError('Debes ingresar una url')
            }
          }}
        >
          Ingresar
        </button>
      </div>
    </div>
  )
}
