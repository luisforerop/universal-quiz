import { FC } from 'react'
import { Home, Questions, Results } from './screens'
import { PossibleScreen } from './shared/models'
import { useScreensContext } from './shared/providers'

const screens: { [key in PossibleScreen]: FC } = {
  home: Home,
  questions: Questions,
  resume: Results,
}

function App() {
  const { currentScreen } = useScreensContext()
  const Screen = screens[currentScreen.value]

  return <Screen />
}

export default App
