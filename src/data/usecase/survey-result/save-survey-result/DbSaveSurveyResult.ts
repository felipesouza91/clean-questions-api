
import { ILoadSurveyResultRepository } from '../load-survey-result/DbLoadSurveyResult.protocols'
import {
  ISaveSurveyResult,
  IAddSurveyResultDTO,
  ISurveyResultModel ,
  ISaveSurveyResultRepository
} from './DbSaveSurveyResult.protocols'

interface IDbSaveSurveyResultProps {
  saveSurveyResultRepository: ISaveSurveyResultRepository
  loadSurveyResultRepository: ILoadSurveyResultRepository
}

export class DbSaveSurveyResult implements ISaveSurveyResult {
  private readonly saveSurveyResultRepository: ISaveSurveyResultRepository
  private readonly loadSurveyResultRepository: ILoadSurveyResultRepository
  constructor (props: IDbSaveSurveyResultProps) {
    Object.assign(this, props)
  }

  async save (data: IAddSurveyResultDTO): Promise<ISurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    const surveyResult = this.loadSurveyResultRepository.loadBySurveyId(data.surveyId, data.accountId)
    return await surveyResult
  }
}
