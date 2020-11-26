import { ISurveyModel } from '@src/domain/models/ISurveyModel'

export interface ILoadSurveys {
  load: () => Promise<ISurveyModel[]>
}
