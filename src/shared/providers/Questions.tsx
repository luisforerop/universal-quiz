import { FC, PropsWithChildren, createContext, useContext } from 'react'
import { useGetQuestionsContext } from '../hooks'
import { IQuestion } from '../models'

export interface IQuestionsContext {
  questions: {
    list: IQuestion[]
    loading: boolean
    setAnswer: (questionId: string, selectedAnswerId: string) => void
  }
  source: {
    url: string | null
    setUrl: (url: string) => void
  }
}

const QuestionsContext = createContext({} as IQuestionsContext)

// un reducer. seteamos la answer seleccionada y configuramos el id de la question actual

export const useQuestionsContext = () => useContext(QuestionsContext)

export const QuestionsContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { Provider } = QuestionsContext
  const context = useGetQuestionsContext()

  return <Provider value={context}>{children}</Provider>
}
