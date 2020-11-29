import { IAddSurveyDTO } from '@src/domain/usecases/survey/IAddSurvey'

export interface IAddSurveyRepository {
  add: (data: IAddSurveyDTO) => Promise<void>
}
