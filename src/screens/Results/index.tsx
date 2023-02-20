import { LoadingAd } from '../../components'
import { useGetResultInfo, useScreensContext } from '../../shared'
import styles from './Results.module.css'

export const Results = () => {
  const { score, questionsResults, loading } = useGetResultInfo()
  const { currentScreen } = useScreensContext()

  if (loading) {
    return <LoadingAd />
  }

  return (
    <div className={styles.resultScreen}>
      <div>
        Puntaje: {score}/{questionsResults.length}
      </div>
      <div className={styles.resultScreenQuestions}>
        {questionsResults.map(
          ({
            question,
            answerIsCorrect,
            correctAnswer,
            selectedAnswer,
            reason,
            questionId,
          }) => (
            <div key={questionId}>
              <h3>{question}</h3>
              {
                <div>
                  {answerIsCorrect ? '✅' : '❌'}
                  {selectedAnswer}
                </div>
              }
              {answerIsCorrect ? null : <div>{`✅ ${correctAnswer}`}</div>}
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
