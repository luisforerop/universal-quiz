import { useEffect, useState } from 'react'
import type { IQuestion, RawQuestionType } from '../../models'
import { IQuestionsContext } from '../../providers'

export const useGetQuestionsContext = (): IQuestionsContext => {
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [loading, setLoading] = useState(false)
  const [url, setUrl] = useState<string | null>(
    'https://my-json-server.typicode.com/luisforerop/universal-quiz/questions'
  )

  useEffect(() => {
    setLoading(true)
    if (url) {
      fetch(url)
        .then((res) => res.json())
        .then((data: RawQuestionType[]) => {
          setQuestions(
            data.map((question, index) => ({
              ...question,
              questionNumber: index + 1,
            }))
          )
          setLoading(false)
        })
    }
  }, [url])

  const setAnswer = (questionId: string, selectedAnswerId: string) => {
    const updatedQuestion = questions.map((question) => {
      if (question.id === questionId) {
        return {
          ...question,
          selectedAnswerId,
        }
      }

      return question
    })
    setQuestions(updatedQuestion)
  }

  return {
    questions: {
      list: questions,
      loading,
      setAnswer,
    },
    source: {
      url,
      setUrl: (url) => setUrl(url),
    },
  }
}
