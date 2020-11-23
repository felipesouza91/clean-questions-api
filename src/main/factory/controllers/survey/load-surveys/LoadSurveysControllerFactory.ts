
import { LoadSurveysController } from '@src/presentation/controller/survey/load-survey/LoadSurveysController'
import { IController } from '@src/presentation/protocols'
import { makeLogControllerDecorator } from '@src/main/factory/decorators/LogControllerDecoratorFactory'
import { makeLoadSurveys } from '@src/main/factory/usecases/survey/load-surveys/DbLoadSurveysFactory'

export const makeLoadSurveysController = (): IController => {
  const controller = new LoadSurveysController({
    loadSurveys: makeLoadSurveys()
  })
  return makeLogControllerDecorator(controller)
}
