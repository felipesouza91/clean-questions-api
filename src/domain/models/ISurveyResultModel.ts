export interface ISurveyResultModel {
  surveyId: string
  question: string
  answers: IAnswerResultModel[]
  date: Date
}

interface IAnswerResultModel {
  image?: string
  answer: string
  count: number
  percent: number
}
