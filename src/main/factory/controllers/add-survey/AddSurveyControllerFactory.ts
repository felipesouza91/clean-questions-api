
import { AddSurveyController } from '../../../../presentation/controller/survey/add-survey/AddSurveyController'
import { IController } from '../../../../presentation/protocols'
import { makeAddSurvey } from '../../usecases/add-survey/DbAddSurveyFactory'
import { makeAddSurveyValidation } from './AddSurveyValidation'

export const makeAddSurveyController = (): IController => {
  return new AddSurveyController({
    addSurvey: makeAddSurvey(),
    validation: makeAddSurveyValidation()
  })
}
