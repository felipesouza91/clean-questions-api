import { ISurveyModel } from '../models/ISurveyModel'

export interface ILoadSurveys {
  load: () => Promise<ISurveyModel[]>
}
