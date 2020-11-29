
import { MissingParamError } from '@src/presentation/erros'
import { IValidation } from '@src/presentation/protocols'
import { ValidationComposite } from './Validation-composite'

interface ISutTypes {
  sut: ValidationComposite
  validationStubs: IValidation[]
}

const mockValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const mockSut = (): ISutTypes => {
  const validationStubs = [mockValidationStub(),mockValidationStub()]
  const sut = new ValidationComposite(validationStubs)
  return {
    sut, validationStubs
  }
}

describe('Validation Composite', () => {
  test('should return an Error if any validation fails', () => {
    const { sut, validationStubs } = mockSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('should return the first Error if more then one validation fails', () => {
    const { sut, validationStubs } = mockSut()
    jest.spyOn(validationStubs[0], 'validate').mockReturnValueOnce(new Error())
    jest.spyOn(validationStubs[1], 'validate').mockReturnValueOnce(new MissingParamError('field'))
    const error = sut.validate({ field: 'any_name' })
    expect(error).toEqual(new Error())
  })
  test('should not return if validations succeeds', () => {
    const { sut } = mockSut()
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
