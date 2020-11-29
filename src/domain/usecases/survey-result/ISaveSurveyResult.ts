import { ISurveyResultModel } from '../../models/ISurveyResultModel'

export type IAddSurveyResultDTO = Omit<ISurveyResultModel, 'id'>

export interface ISaveSurveyResult {
  save: (data: IAddSurveyResultDTO) => Promise<ISurveyResultModel>
}
