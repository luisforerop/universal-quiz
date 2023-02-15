import { useGetCurrentQuestion } from '../../shared'

export const Questions = () => {
  const { currentQuestion, next } = useGetCurrentQuestion()

  if (!currentQuestion) return <div>Cargando</div>

  return (
    <div key={currentQuestion.id}>
      <h2>{currentQuestion.question}</h2>
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
  )
}
