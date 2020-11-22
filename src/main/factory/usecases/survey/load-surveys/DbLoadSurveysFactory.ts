import { SurveyMongoRepository } from '../../../../../infra/db/mongodb/survey-repository/SurveyRepository'

import { ILoadSurveys } from '../../../../../domain/usecases/ILoadSurveys'
import { DbLoadSurveys } from '../../../../../data/usecase/load-surveys/DbLoadSurveys'

export const makeLoadSurveys = (): ILoadSurveys => {
  const loadSurveysRepository = new SurveyMongoRepository()
  return new DbLoadSurveys({ loadSurveysRepository })
}
