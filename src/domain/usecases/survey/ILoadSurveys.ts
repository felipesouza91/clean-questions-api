import { ISurveyModel } from '@src/domain/models/ISurveyModel'

export interface ILoadSurveys {
  load: (accountId: string) => Promise<ISurveyModel[]>
}
