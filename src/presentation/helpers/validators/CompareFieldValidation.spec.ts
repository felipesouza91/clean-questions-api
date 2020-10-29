import { InvalidParamError } from '../../erros'
import { CompareFieldValidation } from './CompareFieldValidation'

const makeSut = (): CompareFieldValidation => {
  return new CompareFieldValidation('field', 'field_toCompare')
}

describe('CompareField Validation', () => {
  test('should return a MissingParamError if validation fails', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name', field_toCompare: 'worng_name' })
    expect(error).toEqual(new InvalidParamError('field_toCompare'))
  })
  test('should not return if validation Succeeds', () => {
    const sut = makeSut()
    const error = sut.validate({ field: 'any_name', field_toCompare: 'any_name' })
    expect(error).toBeFalsy()
  })
})
