
import { ILoadSurveyByIdRepository } from '../../survey/load-surveys-by-id/DbLoadSurveyById.protocols'
import {
  ILoadSurveyResult,
  ISurveyResultModel,
  ILoadSurveyResultRepository
} from './DbLoadSurveyResult.protocols'

interface IDbLoadSurveyResultProps {
  loadSurveyResultRepository: ILoadSurveyResultRepository
  loadSurveyByIdRepository: ILoadSurveyByIdRepository
}

export class DbLoadSurveyResult implements ILoadSurveyResult {
  private readonly loadSurveyResultRepository: ILoadSurveyResultRepository
  private readonly loadSurveyByIdRepository: ILoadSurveyByIdRepository

  constructor (props: IDbLoadSurveyResultProps) {
    Object.assign(this, props)
  }

  async load (surveyId: string, accountId: string): Promise<ISurveyResultModel> {
    const surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId,accountId)
    if (!surveyResult) {
      await this.loadSurveyByIdRepository.loadById(surveyId)
    }
    return surveyResult
  }
}
