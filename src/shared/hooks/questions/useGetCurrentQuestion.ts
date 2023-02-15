import { useEffect, useState } from 'react'
import { IQuestion } from '../../models'
import { useQuestionsContext, useScreensContext } from '../../providers'

type UseGetCurrentQuestionType = () => {
  currentQuestion: IQuestion | null
  next: (answerId: string) => void
}

export const useGetCurrentQuestion: UseGetCurrentQuestionType = () => {
  const {
    questions: { list: questions, setAnswer },
  } = useQuestionsContext()
  const { currentScreen } = useScreensContext()
  const [currentQuestion, setCurrentQuestion] = useState<IQuestion | null>(null)
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)

  useEffect(() => {
    if (questions.length && !currentQuestion) {
      setCurrentQuestion({
        ...questions[0],
      })
    }
  }, [questions])

  const next = (answerId: string) => {
    if (!currentQuestion) return

    setAnswer(currentQuestion.id, answerId)

    if (currentQuestionIndex === questions.length - 1) {
      currentScreen.set('resume')
      setCurrentQuestion(null)
      return
    }

    const newQuestionIndex = currentQuestionIndex + 1
    setCurrentQuestionIndex(newQuestionIndex)
    setCurrentQuestion(questions[newQuestionIndex])
  }

  return {
    currentQuestion,
    next,
  }
}
