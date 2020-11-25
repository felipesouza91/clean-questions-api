import { SurveyMongoRepository } from '@src/infra/db/mongodb/survey/SurveyRepository'

import { ILoadSurveys } from '@src/domain/usecases/ILoadSurveys'
import { DbLoadSurveys } from '@src/data/usecase/load-surveys/DbLoadSurveys'

export const makeLoadSurveys = (): ILoadSurveys => {
  const loadSurveysRepository = new SurveyMongoRepository()
  return new DbLoadSurveys({ loadSurveysRepository })
}
