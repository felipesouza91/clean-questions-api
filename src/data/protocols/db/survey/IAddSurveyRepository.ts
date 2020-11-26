import { IAddSurveyModel } from '@src/domain/usecases/survey/IAddSurvey'

export interface IAddSurveyRepository {
  add: (data: IAddSurveyModel) => Promise<void>
}
