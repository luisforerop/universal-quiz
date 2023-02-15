import React, { useState } from 'react'
import { useQuestionsContext, useScreensContext } from '../../shared/providers'

export const Home = () => {
  const { currentScreen } = useScreensContext()
  const { source } = useQuestionsContext()

  const [url, setUrl] = useState('')
  const [error, setError] = useState<null | string>(null)

  return (
    <div>
      <h1>Universal Quiz</h1>
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
  )
}
