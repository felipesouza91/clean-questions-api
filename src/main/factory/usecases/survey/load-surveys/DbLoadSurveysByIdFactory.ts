import { SurveyMongoRepository } from '@src/infra/db/mongodb/survey/SurveyRepository'
import { DbLoadSurveyById } from '@src/data/usecase/survey/load-surveys-by-id/DbLoadSurveyById'
import { ILoadSurveyById } from '@src/domain/usecases/survey/ILoadSurveyById'

export const makeLoadSurveyById = (): ILoadSurveyById => {
  const loadSurveyRepository = new SurveyMongoRepository()
  return new DbLoadSurveyById({ loadSurveyRepository })
}
