
import { AddSurveyController } from '../../../../../presentation/controller/survey/add-survey/AddSurveyController'
import { IController } from '../../../../../presentation/protocols'
import { makeLogControllerDecorator } from '../../../decorators/LogControllerDecoratorFactory'
import { makeAddSurvey } from '../../../usecases/survey/add-survey/DbAddSurveyFactory'
import { makeAddSurveyValidation } from './AddSurveyValidation'

export const makeAddSurveyController = (): IController => {
  const controller = new AddSurveyController({
    addSurvey: makeAddSurvey(),
    validation: makeAddSurveyValidation()
  })
  return makeLogControllerDecorator(controller)
}
