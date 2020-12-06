import { mockFakeSurvey } from '@src/domain/test'

import {
  ILoadSurveyById,
  IHttpRequest,
  forbidden,
  serverError,
  ISurveyModel,
  InvalidParamError
} from './LoadSurveyResultController.protocols'
import { LoadSurveyResultController } from './LoadSurveyResultController'

interface ISutType {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: ILoadSurveyById
}

const mockFakeHttpRequest = (): IHttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})

const mockLoadSurveyByIdStub = (): ILoadSurveyById => {
  class DbLoadSurveyByIdStub implements ILoadSurveyById {
    async loadById (id: string): Promise<ISurveyModel> {
      return mockFakeSurvey()
    }
  }
  return new DbLoadSurveyByIdStub()
}

const makeSut = (): ISutType => {
  const loadSurveyByIdStub = mockLoadSurveyByIdStub()
  const sut = new LoadSurveyResultController({
    loadSurveyById: loadSurveyByIdStub
  })
  return {
    sut, loadSurveyByIdStub
  }
}

describe('LoadSurveyResultController', () => {
  test('should call loadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockFakeHttpRequest())
    expect(loadSurveyByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
  test('should return 403 if loadSurveyById return null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockResolvedValueOnce(null)
    const response = await sut.handle(mockFakeHttpRequest())
    expect(response).toEqual(forbidden(new InvalidParamError('surveyId')))
  })
  test('should return 500 if loadSurveyById throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValueOnce(new Error())
    const response = await sut.handle(mockFakeHttpRequest())
    expect(response).toEqual(serverError(new Error()))
  })
})
