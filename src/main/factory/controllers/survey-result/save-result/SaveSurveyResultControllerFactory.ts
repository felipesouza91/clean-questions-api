import { IController } from '@src/presentation/protocols'
import { makeLogControllerDecorator } from '@src/main/factory/decorators/LogControllerDecoratorFactory'
import { SaveSurveyResultController } from '@src/presentation/controller/survey-result/save-survey-result/SaveSurveyResultController'
import { makeSaveSurveyResult } from '@src/main/factory/usecases/survey-result/save-result/DbSaveSurveyResultFactory'
import { makeLoadSurveyById } from '@src/main/factory/usecases/survey/load-surveys/DbLoadSurveysByIdFactory'

export const makeSaveSurveyResultController = (): IController => {
  const controller = new SaveSurveyResultController({
    loadSurveyById: makeLoadSurveyById(),
    saveResultSurvey: makeSaveSurveyResult()
  })
  return makeLogControllerDecorator(controller)
}
