
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
    let surveyResult = await this.loadSurveyResultRepository.loadBySurveyId(surveyId,accountId)
    if (!surveyResult) {
      const { question, id, date, answers } = await this.loadSurveyByIdRepository.loadById(surveyId)
      surveyResult = {
        question,
        date,
        surveyId: id,
        answers: answers.map(answer => ({ ...answer, count: 0, percent: 0, isCurrentAccountAnswer: false }))
      }
    }
    return surveyResult
  }
}
