import { ISurveyModel } from '../models/ISurveyModel'

export interface ILoadSurveyById {
  loadById: (id: string) => Promise<ISurveyModel>
}
