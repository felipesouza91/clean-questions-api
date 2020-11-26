import { ISurveyResultModel } from '../../models/ISurveyResultModel'

export type IAddSurveyResultModel = Omit<ISurveyResultModel, 'id'>

export interface ISaveSurveyResult {
  save: (data: IAddSurveyResultModel) => Promise<ISurveyResultModel>
}
