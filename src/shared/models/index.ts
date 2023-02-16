export type AnswerType = {
  isCorrect: boolean
  level?: string
  description: string
  id: string
}

export type SelectedAnswerType = {
  isCorrect: boolean
  id: string
  questionId: string
}

export interface RawQuestionType {
  reason?: string
  id: string
  question: string
  answers: AnswerType[]
  correctAnswerId: string
}

export interface IQuestion {
  reason?: string
  id: string
  question: string
  answers: AnswerType[]
  correctAnswerId: string
  selectedAnswerId?: string
  questionNumber: number
}

export type LevelType = {
  id: string
  name: string
  description?: string
}

export type QuestionState = {
  list: IQuestion[]
  loading: boolean
}

export type AppState = {
  questions: QuestionState
  currentQuestion: IQuestion
}

/* SHARED */
export type PossibleScreen = 'home' | 'questions' | 'resume'
