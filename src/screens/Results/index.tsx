import { useEffect, useState } from 'react'
import {
  AnswerType,
  useQuestionsContext,
  useScreensContext,
} from '../../shared'
import styles from './Results.module.css'

export const Results = () => {
  const {
    questions: { list: questions },
  } = useQuestionsContext()
  const { currentScreen } = useScreensContext()

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
    <div className={styles.resultScreen}>
      <div>
        Puntaje: {score}/{questions.length}
      </div>
      <div className={styles.resultScreenQuestions}>
        {questions.map(
          ({
            question,
            answers,
            correctAnswerId,
            id,
            reason,
            selectedAnswerId,
          }) => (
            <div key={id}>
              <h3>{question}</h3>
              {correctAnswerId !== selectedAnswerId && (
                <div>
                  {correctAnswerId === selectedAnswerId ? '✅' : '❌'}
                  {
                    answers.find(({ id }) => id === selectedAnswerId)
                      ?.description
                  }
                </div>
              )}
              <div>
                ✅{' '}
                {answers.find(({ id }) => id === correctAnswerId)?.description}
              </div>
              {reason && <div>{reason}</div>}
            </div>
          )
        )}
      </div>
      <div className={styles.resultsActionContainer}>
        <button onClick={() => currentScreen.set('home')}>Regresar</button>
      </div>
    </div>
  )
}
