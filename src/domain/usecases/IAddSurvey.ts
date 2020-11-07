
interface IAnswer {
  image: string
  answer: string
}

export interface IAddSurveyModel {
  question: string
  answers: IAnswer[]
}

export interface IAddSurvey {
  add: (account: IAddSurveyModel) => Promise<void>
}
