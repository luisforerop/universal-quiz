import { useEffect, useState } from 'react'
import type {
  AnswerToValidate,
  AnswerType,
  GetQuestionsResponseType,
  GetResultsResponseType,
  IQuestion,
  ResultType,
} from '../../models'
import { IQuestionsContext, useScreensContext } from '../../providers'
import { endpoint } from '../../constants'

export const useGetQuestionsContext = (): IQuestionsContext => {
  const [questions, setQuestions] = useState<IQuestion[]>([])
  const [questionsLoading, setQuestionsLoading] = useState(false)
  const [questionsWithError, setQuestionsWithError] = useState(false)
  const [results, setResults] = useState<ResultType[]>([])
  const [resultsLoading, setResultsLoading] = useState(false)
  const [resultsWithError, setResultsWithError] = useState(false)
  const [answers, setAnswers] = useState<AnswerToValidate[]>([])
  const baseUrl = endpoint()
  const { currentScreen } = useScreensContext()

  useEffect(() => {
    setQuestionsLoading(true)
    const stringLocalQuestions = localStorage.getItem('questions')
    const localQuestions: IQuestion[] = JSON.parse(stringLocalQuestions ?? '[]')

    if (!localQuestions.length) {
      fetch(`${baseUrl}/getQuestions`, {
        method: 'GET',
        referrerPolicy: 'no-referrer',
      })
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
          setQuestionsLoading(false)
        })
        .catch((e) => {
          setQuestionsWithError(true)
          setQuestionsLoading(false)
        })
    } else {
      setQuestions(localQuestions)
      setQuestionsLoading(false)
    }
  }, [])

  useEffect(() => {
    if (answers.length === questions.length && questions.length > 0) {
      setResultsLoading(true)
      fetch(`${baseUrl}/getResults`, {
        body: JSON.stringify(answers),
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
      })
        .then((res) => res.json())
        .then((data: GetResultsResponseType) => {
          const { results } = data
          setResults(results)
          setResultsLoading(false)
        })
        .catch((e) => {
          setResultsLoading(false)
          setResultsWithError(true)
        })
    }
  }, [answers])

  useEffect(() => {
    if (currentScreen.value === 'home') {
      setAnswers([])
    }
  }, [currentScreen])

  const setAnswer = (questionId: string, selectedAnswerId: string) => {
    setAnswers((currentAnswers) =>
      currentAnswers.concat({ questionId, selectedAnswerId })
    )
  }

  return {
    questions: {
      list: questions,
      loading: questionsLoading,
      withError: questionsWithError,
      setAnswer,
    },
    results: {
      list: results,
      loading: resultsLoading,
      withError: resultsWithError,
    },
  }
}
