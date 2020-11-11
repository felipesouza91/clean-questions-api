import { SurveyMongoRepository } from '../../../../infra/db/mongodb/survey-repository/SurveyRepository'
import { DbAddSurvey } from '../../../../data/usecase/add-survey/DbAddSurvey'
import { IAddSurvey } from '../../../../domain/usecases/IAddSurvey'

export const makeAddSurvey = (): IAddSurvey => {
  const addSurveyRepository = new SurveyMongoRepository()
  return new DbAddSurvey({ addSurveyRepository })
}
