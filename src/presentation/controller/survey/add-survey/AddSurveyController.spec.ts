import { IValidation, IHttpRequest, IAddSurvey,IAddSurveyDTO } from './AddSurveyController.protocols'
import { AddSurveyController } from './AddSurveyController'
import { badRequest, serverError, noContent } from '@src/presentation/helpers/http/HttpHelper'
import MockDate from 'mockdate'

interface ISutType {
  sut: AddSurveyController
  validationStub: IValidation
  addSurveyStub: IAddSurvey
}

const mockFakeHttpRequest = (): IHttpRequest => {
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

const mockValidationStub = (): IValidation => {
  class ValidationStub implements IValidation {
    validate (input: any): Error {
      return null
    }
  }
  return new ValidationStub()
}

const mockAddSurveyStub = (): IAddSurvey => {
  class AddSurveyStub implements IAddSurvey {
    async add (data: IAddSurveyDTO): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new AddSurveyStub()
}

const mockSut = (): ISutType => {
  const validationStub = mockValidationStub()
  const addSurveyStub = mockAddSurveyStub()
  const sut = new AddSurveyController({ validation: validationStub, addSurvey: addSurveyStub })
  return {
    sut,
    validationStub,
    addSurveyStub
  }
}

describe('Add Survey Controller', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call validation with corrects values', async () => {
    const { sut, validationStub } = mockSut()
    const validationSpy = jest.spyOn(validationStub, 'validate')
    const httpRequest = mockFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(validationSpy).toHaveBeenCalledWith(httpRequest.body)
  })

  test('should returns 400 if Validation fails', async () => {
    const { sut, validationStub } = mockSut()
    jest.spyOn(validationStub, 'validate').mockReturnValueOnce(new Error())
    const httpRequest = mockFakeHttpRequest()
    const response = await sut.handle(httpRequest)
    expect(response).toEqual(badRequest(new Error()))
  })

  test('should call AddSurvey with corrects values', async () => {
    const { sut, addSurveyStub } = mockSut()
    const addSpy = jest.spyOn(addSurveyStub, 'add')
    const httpRequest = mockFakeHttpRequest()
    await sut.handle(httpRequest)
    expect(addSpy).toHaveBeenCalledWith({ ...httpRequest.body, date: new Date() })
  })

  test('should returns 500 if AddSurvey throws ', async () => {
    const { sut, addSurveyStub } = mockSut()
    jest.spyOn(addSurveyStub, 'add').mockRejectedValueOnce(new Error())
    const response = await sut.handle(mockFakeHttpRequest())
    expect(response).toEqual(serverError(new Error()))
  })

  test('should returns 204 on success', async () => {
    const { sut } = mockSut()
    const response = await sut.handle(mockFakeHttpRequest())
    expect(response).toEqual(noContent())
  })
})
