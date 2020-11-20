
export interface IAnswerModel {
  image?: string
  answer: string
}

export interface ISurveyModel {
  id: string
  question: string
  answers: IAnswerModel[]
  date: Date
}
