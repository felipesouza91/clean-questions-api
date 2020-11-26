import { IAnswerModel } from '../../models/ISurveyModel'

export interface IAddSurveyModel {
  question: string
  answers: IAnswerModel[]
  date: Date
}

export interface IAddSurvey {
  add: (surveyData: IAddSurveyModel) => Promise<void>
}
