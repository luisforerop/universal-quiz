import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import { QuestionsContextProvider, ScreensContextProvider } from './shared'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <React.StrictMode>
    <ScreensContextProvider>
      <QuestionsContextProvider>
        <App />
      </QuestionsContextProvider>
    </ScreensContextProvider>
  </React.StrictMode>
)
