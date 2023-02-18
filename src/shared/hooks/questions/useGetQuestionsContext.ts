import { useEffect, useState } from 'react'
import type {
  AnswerToValidate,
  AnswerType,
  GetQuestionsResponseType,
  GetResultsResponseType,
  IQuestion,
  ResultType,
} from '../../models'
import { IQuestionsContext } from '../../providers'

export const useGetQuestionsContext = (): IQuestionsContext => {
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [answers, setAnswers] = useState<AnswerToValidate[]>([])
  const [loading, setLoading] = useState(false)
  const [results, setResults] = useState<ResultType[]>([])
  const [resultsLoading, setResultsLoading] = useState(false)

  useEffect(() => {
    setLoading(true)
    const stringLocalQuestions = localStorage.getItem('questions')
    const localQuestions: IQuestion[] = JSON.parse(stringLocalQuestions ?? '[]')

    if (!localQuestions.length) {
      fetch(
        'https://n586ggoxy8.execute-api.us-east-1.amazonaws.com/dev/getQuestions',
        { method: 'GET', referrerPolicy: 'no-referrer' }
      )
        .then((res) => res.json())
        .then((data: GetQuestionsResponseType) => {
          const { questions } = data
          const normalizedQuestions: IQuestion[] = questions.map(
            ({ answers, id, question, reason }, index) => {
              const normalizedAnswers: AnswerType[] = answers.map(
                ({ answer, id }) => ({
                  description: answer,
                  id,
                })
              )
              return {
                answers: normalizedAnswers,
                id,
                text: question,
                questionNumber: index + 1,
                reason,
              }
            }
          )
          localStorage.setItem('questions', JSON.stringify(normalizedQuestions))
          setQuestions(normalizedQuestions)
          setLoading(false)
        })
    } else {
      setQuestions(localQuestions)
      setLoading(false)
    }
  }, [])

  useEffect(() => {
    if (answers.length === questions.length && questions.length > 0) {
      setResultsLoading(true)
      fetch(
        'https://n586ggoxy8.execute-api.us-east-1.amazonaws.com/dev/getResults',
        {
          body: JSON.stringify(answers),
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        }
      )
        .then((res) => res.json())
        .then((data: GetResultsResponseType) => {
          const { results } = data
          setResults(results)
          setResultsLoading(false)
        })
    }
  }, [answers])

  const setAnswer = (questionId: string, selectedAnswerId: string) => {
    setAnswers((currentAnswers) =>
      currentAnswers.concat({ questionId, selectedAnswerId })
    )
  }

  return {
    questions: {
      list: questions,
      loading,
      setAnswer,
    },
    results: {
      list: results,
      loading: resultsLoading,
    },
  }
}
