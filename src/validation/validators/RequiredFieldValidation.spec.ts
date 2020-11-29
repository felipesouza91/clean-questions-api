import { MissingParamError } from '@src/presentation/erros'
import { RequiredFieldValidation } from './RequiredFieldValidation'

const mockSut = (): RequiredFieldValidation => {
  return new RequiredFieldValidation('field')
}

describe('RequiredField Validation', () => {
  test('should return a MissingParamError if validation fails', () => {
    const sut = mockSut()
    const error = sut.validate({ name: 'any_name' })
    expect(error).toEqual(new MissingParamError('field'))
  })
  test('should not return if validation Succeeds', () => {
    const sut = mockSut()
    const error = sut.validate({ field: 'any_name' })
    expect(error).toBeFalsy()
  })
})
