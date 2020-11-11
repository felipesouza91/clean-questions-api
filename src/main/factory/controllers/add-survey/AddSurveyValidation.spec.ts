
import { IValidation } from '../../../../presentation/protocols'
import { makeAddSurveyValidation } from './AddSurveyValidation'
import { RequiredFieldValidation, ValidationComposite } from '../../../../validation/validators'
jest.mock('../../../../validation/validators/Validation-composite')

describe('AddSurveyValidation Factory', () => {
  test('should call Validation composity with all validations', () => {
    makeAddSurveyValidation()
    const validations: IValidation[] = []
    for (const field of ['question', 'answers']) {
      validations.push(new RequiredFieldValidation(field))
    }
    expect(ValidationComposite).toHaveBeenCalledWith(validations)
  })
})
