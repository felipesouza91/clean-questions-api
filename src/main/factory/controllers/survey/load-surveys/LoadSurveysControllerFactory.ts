
import { LoadSurveysController } from '../../../../../presentation/controller/survey/load-survey/LoadSurveysController'
import { IController } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory'
import { makeLoadSurveys } from '../../../usecases/survey/load-surveys/DbLoadSurveysFactory'

export const makeLoadSurveysController = (): IController => {
  const controller = new LoadSurveysController({
    loadSurveys: makeLoadSurveys()
  })
  return makeLogControllerDecorator(controller)
}
