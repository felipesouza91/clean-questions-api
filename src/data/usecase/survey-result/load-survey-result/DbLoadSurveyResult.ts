
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

  async load (surveyId: string, accountId: string): Promise<ISurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId,accountId)
    return surveyResult
  }
}
