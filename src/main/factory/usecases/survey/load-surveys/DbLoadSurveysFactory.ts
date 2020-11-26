import { SurveyMongoRepository } from '@src/infra/db/mongodb/survey/SurveyRepository'

import { ILoadSurveys } from '@src/domain/usecases/survey/ILoadSurveys'
import { DbLoadSurveys } from '@src/data/usecase/survey/load-surveys/DbLoadSurveys'

export const makeLoadSurveys = (): ILoadSurveys => {
  const loadSurveysRepository = new SurveyMongoRepository()
  return new DbLoadSurveys({ loadSurveysRepository })
}
