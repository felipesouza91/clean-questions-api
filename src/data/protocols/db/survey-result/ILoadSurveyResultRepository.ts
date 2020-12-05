
import { ISurveyResultModel } from '@src/domain/models/ISurveyResultModel'

export interface ILoadSurveyResultRepository {
  loadBySurveyId: (surveyId: string) => Promise<ISurveyResultModel>
}
