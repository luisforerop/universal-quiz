import { useEffect, useState } from 'react'
import { useGetCurrentQuestion } from '../../shared'
import styles from './Question.module.css'

export const Questions = () => {
  const { currentQuestion, next, questionsQuantity } = useGetCurrentQuestion()
  const [advance, setAdvance] = useState('0%')

  useEffect(() => {
    setAdvance(
      `${Math.floor(
        ((currentQuestion?.questionNumber ?? 0) / questionsQuantity) * 100
      )}%`
    )

    return () => {}
  }, [currentQuestion, questionsQuantity])

  if (!currentQuestion) return <div>Cargando</div>

  return (
    <div className={styles.screenQuestionContainer}>
      <div>
        <div className={styles.progressBarContainer}>
          <div style={{ width: advance }} className={styles.progressBar}>
            {currentQuestion.questionNumber}
          </div>
        </div>
      </div>
      <div className={styles.questionContainer}>
        <h2>{currentQuestion.question}</h2>
        <div className={styles.answerContainer}>
          {currentQuestion.answers.map((answer) => {
            const { description, id: answerId } = answer
            return (
              <button
                key={answerId}
                onClick={() => {
                  next(answerId)
                }}
              >
                {description}
              </button>
            )
          })}
        </div>
      </div>
    </div>
  )
}
