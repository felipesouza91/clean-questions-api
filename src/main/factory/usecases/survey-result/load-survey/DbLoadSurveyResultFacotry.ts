
import { DbLoadSurveyResult } from '@src/data/usecase/survey-result/load-survey-result/DbLoadSurveyResult'
import { ILoadSurveyResult } from '@src/domain/usecases/survey-result/ILoadSurveyResult'
import { SurveyResultMongoRepository } from '@src/infra/db/mongodb/survey-result/SurveyResultRepository'
import { SurveyMongoRepository } from '@src/infra/db/mongodb/survey/SurveyRepository'

export const makeLoadSurveyResult = (): ILoadSurveyResult => {
  const loadSurveyByIdRepository = new SurveyMongoRepository()
  const loadSurveyResultRepository = new SurveyResultMongoRepository()
  return new DbLoadSurveyResult({
    loadSurveyResultRepository,
    loadSurveyByIdRepository
  })
}
