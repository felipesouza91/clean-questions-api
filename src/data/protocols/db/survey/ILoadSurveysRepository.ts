import { ISurveyModel } from '@src/domain/models/ISurveyModel'

export interface ILoadSurveysRepository {
  loadAll: () => Promise<ISurveyModel[]>
}
