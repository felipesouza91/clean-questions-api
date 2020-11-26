import { ISurveyModel } from '@src/domain/models/ISurveyModel'

export interface ILoadSurveyById {
  loadById: (id: string) => Promise<ISurveyModel>
}
