
import {
  ISaveSurveyResult,
  IAddSurveyResultModel,
  ISurveyResultModel ,
  ISaveSurveyResultRepository
} from './DbSaveSurveyResult.protocols'

interface IDbSaveSurveyResultProps {
  saveSurveyResultRepository: ISaveSurveyResultRepository
}

export class DbSaveSurveyResult implements ISaveSurveyResult {
  private readonly saveSurveyResultRepository: ISaveSurveyResultRepository
  constructor (props: IDbSaveSurveyResultProps) {
    Object.assign(this, props)
  }

  async save (data: IAddSurveyResultModel): Promise<ISurveyResultModel> {
    await this.saveSurveyResultRepository.save(data)
    return null
  }
}
