import { FC, PropsWithChildren, createContext, useContext } from 'react'
import { useGetQuestionsContext } from '../hooks'
import { IQuestion, ResultType } from '../models'

export interface IQuestionsContext {
  questions: {
    list: IQuestion[]
    loading: boolean
    setAnswer: (questionId: string, selectedAnswerId: string) => void
  }
  results: {
    list: ResultType[]
    loading: boolean
  }
}

const QuestionsContext = createContext({} as IQuestionsContext)

export const useQuestionsContext = () => useContext(QuestionsContext)

export const QuestionsContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const { Provider } = QuestionsContext
  const context = useGetQuestionsContext()

  return <Provider value={context}>{children}</Provider>
}
