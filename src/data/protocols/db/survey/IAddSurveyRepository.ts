import { IAddSurveyModel } from '../../../../domain/usecases/IAddSurvey'

export interface IAddSurveyRepository {
  add: (data: IAddSurveyModel) => Promise<void>
}
