import { ISurveyResultModel } from '../../models/ISurveyResultModel'

export interface IAddSurveyResultDTO {
  accountId: string
  answer: string
  surveyId: string
  date: Date
}

export interface ISaveSurveyResult {
  save: (data: IAddSurveyResultDTO) => Promise<ISurveyResultModel>
}
