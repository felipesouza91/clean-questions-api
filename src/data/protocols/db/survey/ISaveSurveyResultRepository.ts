
import { ISurveyResultModel } from '@src/domain/models/ISurveyResultModel'
import { IAddSurveyResultModel } from '@src/domain/usecases/ISaveSurveyResult'

export interface ISaveSurveyResultRepository {
  save: (data: IAddSurveyResultModel) => Promise<ISurveyResultModel>
}
