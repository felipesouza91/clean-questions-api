import { ISurveyModel } from '../../../../domain/models/ISurveyModel'

export interface ILoadSurveysRepository {
  load: () => Promise<ISurveyModel[]>
}
