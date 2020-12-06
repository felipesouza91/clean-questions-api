import { mockFakeSurvey, mockFakeSurveyResultModel } from '@src/domain/test'

import {
  ILoadSurveyById,
  IHttpRequest,
  forbidden,
  serverError,
  ISurveyModel,
  InvalidParamError,
  ILoadSurveyResult,
  ISurveyResultModel
} from './LoadSurveyResultController.protocols'
import { LoadSurveyResultController } from './LoadSurveyResultController'

interface ISutType {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: ILoadSurveyById
  loadSurveyResultStub: ILoadSurveyResult
}

const mockFakeHttpRequest = (): IHttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  },
  accountId: 'any_account_id'
})

const mockLoadSurveyByIdStub = (): ILoadSurveyById => {
  class DbLoadSurveyByIdStub implements ILoadSurveyById {
    async loadById (id: string): Promise<ISurveyModel> {
      return mockFakeSurvey()
    }
  }
  return new DbLoadSurveyByIdStub()
}

const mockLoadSurveyResultStub = (): ILoadSurveyResult => {
  class LoadSurveyResultStub implements ILoadSurveyResult {
    async load (surveyId: string, accountId: string): Promise<ISurveyResultModel> {
      return mockFakeSurveyResultModel()
    }
  }
  return new LoadSurveyResultStub()
}

const makeSut = (): ISutType => {
  const loadSurveyByIdStub = mockLoadSurveyByIdStub()
  const loadSurveyResultStub = mockLoadSurveyResultStub()
  const sut = new LoadSurveyResultController({
    loadSurveyById: loadSurveyByIdStub,
    loadSurveyResult: loadSurveyResultStub
  })
  return {
    sut, loadSurveyByIdStub, loadSurveyResultStub
  }
}

describe('LoadSurveyResultController', () => {
  test('should call loadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockFakeHttpRequest())
    expect(loadSurveyByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
  test('should call loadSurveyResult with correct values', async () => {
    const { sut, loadSurveyResultStub } = makeSut()
    const loadSurveyResutlSpy = jest.spyOn(loadSurveyResultStub, 'load')
    await sut.handle(mockFakeHttpRequest())
    expect(loadSurveyResutlSpy).toHaveBeenCalledWith('any_survey_id', 'any_account_id')
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
