import { IValidation, IHttpRequest } from './AddSurveyController.protocols'
import { AddSurveyController } from './AddSurveyController'
import { badRequest } from '../../../helpers/http/HttpHelper'
interface ISutType {
  sut: AddSurveyController
  validationStub: IValidation
}

const makeFakeHttpRequest = (): IHttpRequest => {
  return {
    body: {
      question: 'any_question',
      answers: [
        {
          image: 'any_image',
          answer: 'any_answer'
        }
      ]
    }
  }
}

const makeValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const makeSut = (): ISutType => {
  const validationStub = makeValidationStub()
  const sut = new AddSurveyController({ validation: validationStub })
  return {
    sut,
    validationStub
  }
}

describe('Add Survey Controller', () => {
  test('should call validation with corrects values', async () => {
    const { sut, validationStub } = makeSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = makeFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should returns 400 if Validation fails', async () => {
    const { sut, validationStub } = makeSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = makeFakeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new Error()))
  })
})
