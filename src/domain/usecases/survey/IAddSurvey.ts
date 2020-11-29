import { ISurveyModel } from '../../models/ISurveyModel'

export type IAddSurveyDTO = Omit<ISurveyModel, 'id'>

export interface IAddSurvey {
  add: (surveyData: IAddSurveyDTO) => Promise<void>
}
