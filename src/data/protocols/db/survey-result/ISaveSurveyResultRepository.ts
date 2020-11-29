
import { ISurveyResultModel } from '@src/domain/models/ISurveyResultModel'
import { IAddSurveyResultDTO } from '@src/domain/usecases/survey-result/ISaveSurveyResult'

export interface ISaveSurveyResultRepository {
  save: (data: IAddSurveyResultDTO) => Promise<ISurveyResultModel>
}
