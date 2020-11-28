import { ISaveSurveyResult } from '@src/domain/usecases/survey-result/ISaveSurveyResult'
import { DbSaveSurveyResult } from '@src/data/usecase/survey-result/save-survey-result/DbSaveSurveyResult'
import { SurveyResultMongoRepository } from '@src/infra/db/mongodb/survey-result/SurveyResultRepository'

export const makeSaveSurveyResult = (): ISaveSurveyResult => {
  const saveSurveyResultRepository = new SurveyResultMongoRepository()
  return new DbSaveSurveyResult({
    saveSurveyResultRepository
  })
}
