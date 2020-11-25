import { SurveyMongoRepository } from '@src/infra/db/mongodb/survey/SurveyRepository'
import { DbAddSurvey } from '@src/data/usecase/add-survey/DbAddSurvey'
import { IAddSurvey } from '@src/domain/usecases/IAddSurvey'

export const makeAddSurvey = (): IAddSurvey => {
  const addSurveyRepository = new SurveyMongoRepository()
  return new DbAddSurvey({ addSurveyRepository })
}
