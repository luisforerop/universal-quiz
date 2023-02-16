import { PropsWithChildren, createContext, useContext, useState } from 'react'
import type { FC, Dispatch, SetStateAction } from 'react'
import { PossibleScreen } from '../models'

interface IScreensContext {
  currentScreen: {
    set: (value: PossibleScreen) => void
    value: PossibleScreen
  }
}
const ScreensContext = createContext({} as IScreensContext)

export const useScreensContext = () => useContext(ScreensContext)

export const ScreensContextProvider: FC<PropsWithChildren> = ({ children }) => {
  const { Provider } = ScreensContext
  const [possibleScreen, setPossibleScreen] =
    useState<PossibleScreen>('questions')
  const context: IScreensContext = {
    currentScreen: {
      set: (possibleScreen) => setPossibleScreen(possibleScreen),
      value: possibleScreen,
    },
  }
  return <Provider value={context}>{children}</Provider>
}
