import { ISurveyModel } from '../../../../domain/models/ISurveyModel'

export interface ILoadSurveysRepository {
  loadAll: () => Promise<ISurveyModel[]>
}
