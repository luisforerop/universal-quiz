import { useEffect, useState } from 'react'
import { useQuestionsContext } from '../../shared'

export const Results = () => {
  const {
    questions: { list: questions },
  } = useQuestionsContext()

  const [score, setScore] = useState(0)

  useEffect(() => {
    const _score = questions.reduce(
      (count, question) =>
        count +
        (question.correctAnswerId === question.selectedAnswerId ? 1 : 0),
      0
    )
    setScore(_score)
  }, [questions])

  return (
    <div>
      <div>Puntaje: {score}</div>
      <div>
        {questions.map((question) => (
          <div key={question.id}>
            <div>{question.question}</div>
            <div>
              {
                question.answers.find(
                  ({ id }) => id === question.selectedAnswerId
                )?.description
              }
            </div>
            <div>
              {
                question.answers.find(
                  ({ id }) => id === question.correctAnswerId
                )?.description
              }
            </div>
            <div>{question.reason}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
