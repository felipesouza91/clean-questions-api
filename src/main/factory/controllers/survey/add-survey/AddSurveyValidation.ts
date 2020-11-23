
import { RequiredFieldValidation , ValidationComposite } from '@src/validation/validators'
import { IValidation } from '@src/presentation/protocols'

export const makeAddSurveyValidation = (): ValidationComposite => {
  const validations: IValidation[] = []
  for (const field of ['question', 'answers']) {
    validations.push(new RequiredFieldValidation(field))
  }
  return new ValidationComposite(validations)
}
