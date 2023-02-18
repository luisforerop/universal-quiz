import React, { useEffect } from 'react'
import { useState } from 'react'
import { useQuestionsContext } from '../../providers'

type QuestionResult = {
  question: string
  reason: string
  answerIsCorrect: boolean
  selectedAnswer: string
  correctAnswer: string
  questionId: string
}

export const useGetResultInfo = () => {
  const {
    results: { list: results, loading },
    questions: { list: questions },
  } = useQuestionsContext()

  const [score, setScore] = useState(0)
  const [questionsResults, setQuestionsResults] = useState<QuestionResult[]>([])

  useEffect(() => {
    const _score = results.reduce(
      (count, result) =>
        count + (result.correctAnswerId === result.selectedAnswerId ? 1 : 0),
      0
    )
    setScore(_score)

    const _questionsResults: QuestionResult[] = results.map(
      ({ correctAnswerId, questionId, selectedAnswerId }) => {
        const question = questions.find(({ id }) => questionId === id)!
        return {
          questionId: question.id,
          answerIsCorrect: correctAnswerId === selectedAnswerId,
          correctAnswer: question.answers.find(
            (answer) => correctAnswerId === answer.id
          )!.description,
          question: question.text,
          reason: question.reason!,
          selectedAnswer: question.answers.find(
            (answer) => selectedAnswerId === answer.id
          )!.description,
        }
      }
    )

    setQuestionsResults(_questionsResults)
  }, [results, questions])

  return {
    score,
    questionsResults,
    loading,
  }
}
