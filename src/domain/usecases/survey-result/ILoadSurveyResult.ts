import { ISurveyResultModel } from '../../models/ISurveyResultModel'

export interface ILoadSurveyResult {
  load: (surveyId: string) => Promise<ISurveyResultModel>
}
