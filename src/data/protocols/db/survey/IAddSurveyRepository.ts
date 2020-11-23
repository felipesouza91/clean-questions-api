import { IAddSurveyModel } from '@src/domain/usecases/IAddSurvey'

export interface IAddSurveyRepository {
  add: (data: IAddSurveyModel) => Promise<void>
}
