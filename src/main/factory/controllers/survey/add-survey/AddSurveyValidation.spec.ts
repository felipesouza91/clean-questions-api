
import { IValidation } from '@src/presentation/protocols'
import { makeAddSurveyValidation } from './AddSurveyValidation'
import { RequiredFieldValidation, ValidationComposite } from '@src/validation/validators'
jest.mock('@src/validation/validators/Validation-composite')

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
