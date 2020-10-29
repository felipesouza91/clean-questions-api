
import { MissingParamError } from '../../erros'
import { Validation } from './Validation'
import { ValidationComposite } from './Validation-composite'

interface SutTypes {
  sut: ValidationComposite
  validationStub: Validation
}

const makeMockValidationWithError = (): Validation => {
  class ValidationStub implements Validation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): SutTypes => {
  const validationStub = makeMockValidationWithError()
  const sut = new ValidationComposite([validationStub])
  return {
    sut, validationStub
  }
}

describe('Validation Composite', () => {
  test('should return an Erro if any validation fails', () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
})
