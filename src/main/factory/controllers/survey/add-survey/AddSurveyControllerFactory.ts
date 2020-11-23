
import { AddSurveyController } from '@src/presentation/controller/survey/add-survey/AddSurveyController'
import { IController } from '@src/presentation/protocols'
import { makeLogControllerDecorator } from '@src/main/factory/decorators/LogControllerDecoratorFactory'
import { makeAddSurvey } from '@src/main/factory/usecases/survey/add-survey/DbAddSurveyFactory'
import { makeAddSurveyValidation } from './AddSurveyValidation'

export const makeAddSurveyController = (): IController => {
  const controller = new AddSurveyController({
    addSurvey: makeAddSurvey(),
    validation: makeAddSurveyValidation()
  })
  return makeLogControllerDecorator(controller)
}
