
import {
  ILoadSurveyResult,
  ISurveyResultModel,
  ILoadSurveyResultRepository
} from './DbLoadSurveyResult.protocols'

interface IDbLoadSurveyResultProps {
  loadSurveyResultRepository: ILoadSurveyResultRepository
}

export class DbLoadSurveyResult implements ILoadSurveyResult {
  private readonly loadSurveyResultRepository: ILoadSurveyResultRepository

  constructor (props: IDbLoadSurveyResultProps) {
    Object.assign(this, props)
  }

  async load (surveyId: string): Promise<ISurveyResultModel> {
    await this.loadSurveyResultRepository.loadBySurveyId(surveyId)
    return null
  }
}
