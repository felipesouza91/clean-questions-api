import { ISurveyModel } from '@src/domain/models/ISurveyModel'

export interface ILoadSurveyByIdRepository {
  loadById: (id: string) => Promise<ISurveyModel>
}
