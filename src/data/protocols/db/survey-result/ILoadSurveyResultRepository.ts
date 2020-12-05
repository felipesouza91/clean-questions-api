
import { ISurveyResultModel } from '@src/domain/models/ISurveyResultModel'

export interface ILoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string, accountId: string) => Promise<ISurveyResultModel>
}
