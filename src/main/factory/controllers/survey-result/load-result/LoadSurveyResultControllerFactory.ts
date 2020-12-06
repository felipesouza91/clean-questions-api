import { IController } from '@src/presentation/protocols'
import { makeLogControllerDecorator } from '@src/main/factory/decorators/LogControllerDecoratorFactory'
import { makeLoadSurveyById } from '@src/main/factory/usecases/survey/load-surveys/DbLoadSurveysByIdFactory'
import { LoadSurveyResultController } from '@src/presentation/controller/survey-result/load-survey-result/LoadSurveyResultController'
import { makeLoadSurveyResult } from '@src/main/factory/usecases/survey-result/load-survey/DbLoadSurveyResultFacotry'

export const makeLoadSurveyResultController = (): IController => {
  const controller = new LoadSurveyResultController({
    loadSurveyById: makeLoadSurveyById(),
    loadSurveyResult: makeLoadSurveyResult()
  })
  return makeLogControllerDecorator(controller)
}
