
import { ISurveyResultModel } from '@src/domain/models/ISurveyResultModel'
import { IAddSurveyResultModel } from '@src/domain/usecases/survey-result/ISaveSurveyResult'

export interface ISaveSurveyResultRepository {
  save: (data: IAddSurveyResultModel) => Promise<ISurveyResultModel>
}
