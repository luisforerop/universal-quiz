export type AnswerType = {
  description: string
  id: string
}

export type SelectedAnswerType = {
  isCorrect: boolean
  id: string
  questionId: string
}

export interface IQuestion {
  reason: string
  id: string
  text: string
  answers: AnswerType[]
  questionNumber: number
}

/* REQUEST */
export type RawAnswerType = {
  answer: string
  id: string
}

export interface RawQuestionType {
  reason: string
  id: string
  question: string
  answers: RawAnswerType[]
}

export type GetQuestionsResponseType = {
  statusCode: 200
  questions: RawQuestionType[]
}

export type GetResultsResponseType = {
  statusCode: 200
  results: ResultType[]
}

/* STATES */

export type QuestionState = {
  list: IQuestion[]
  loading: boolean
}

export type AppState = {
  questions: QuestionState
  currentQuestion: IQuestion
}

export type AnswerToValidate = {
  questionId: string
  selectedAnswerId: string
}

export type ResultType = {
  questionId: string
  selectedAnswerId: string
  correctAnswerId: string
}

/* SHARED */
export type PossibleScreen = 'home' | 'questions' | 'resume'
