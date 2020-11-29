import { SaveSurveyResultController } from './SaveSurveyResultController'
import {
  IHttpRequest,
  ILoadSurveyById,
  ISurveyModel,
  forbidden,
  InvalidParamError,
  ISaveSurveyResult,
  IAddSurveyResultModel,
  ISurveyResultModel,
  serverError,
  ok
} from './SaveSurveyResultController.protocols'
import MockDate from 'mockdate'

interface ISutType {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: ILoadSurveyById
  saveSurveyResultStub: ISaveSurveyResult
}

const mockFakeSurveyModel = (): ISurveyModel => ({
  id: 'any_survey_id',
  answers: [
    { answer: 'any_answer' },
    { answer: 'another_answer' }
  ],
  question: 'any_question',
  date: new Date()
})

const mockFakeAddSaveSurveyResult = (): IAddSurveyResultModel => ({
  accountId: 'any_account_id',
  answer: 'any_answer',
  surveyId: 'any_survey_id',
  date: new Date()
})

const mockFakeSaveSurveyResult = (): ISurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  surveyId: 'any_survey_id',
  date: new Date()
})

const mockFakeHttpRequest = (): IHttpRequest => ({
  params: {
    survey_id: 'any_survey_id'
  },
  body: {
    answer: 'any_answer'
  },
  accountId: 'any_account_id'
})

const mockLoadSurveyByIdStub = (): ILoadSurveyById => {
  class LoadSurveyByIdStub implements ILoadSurveyById {
    async loadById (id: string): Promise<ISurveyModel> {
      return mockFakeSurveyModel()
    }
  }
  return new LoadSurveyByIdStub()
}

const mockSaveSurveyResultStub = (): ISaveSurveyResult => {
  class SaveSurveyResultStub implements ISaveSurveyResult {
    async save (data: IAddSurveyResultModel): Promise<ISurveyResultModel> {
      return mockFakeSaveSurveyResult()
    }
  }
  return new SaveSurveyResultStub()
}

const mockSut = (): ISutType => {
  const loadSurveyByIdStub = mockLoadSurveyByIdStub()
  const saveSurveyResultStub = mockSaveSurveyResultStub()
  const sut = new SaveSurveyResultController({
    loadSurveyById: loadSurveyByIdStub,
    saveResultSurvey: saveSurveyResultStub
  })
  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub
  }
}

describe('SaveSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = mockSut()
    const loadSurveyByIdSpty = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockFakeHttpRequest())
    expect(loadSurveyByIdSpty).toHaveBeenCalledWith('any_survey_id')
  })

  test('should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = mockSut()
    const saveSurveyResultSpty = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(mockFakeHttpRequest())
    expect(saveSurveyResultSpty).toHaveBeenCalledWith(mockFakeAddSaveSurveyResult())
  })

  test('should return 403 if LoadSurveyById return null', async () => {
    const { sut, loadSurveyByIdStub } = mockSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockResolvedValueOnce(null)
    const result = await sut.handle(mockFakeHttpRequest())
    expect(result).toEqual(forbidden(new InvalidParamError('survey_id')))
  })

  test('should return 403 if an invalid answer is provider', async () => {
    const { sut } = mockSut()
    const invalidRequest = { ...mockFakeHttpRequest(), body: { answer: 'invalid_any_answer' } }
    const result = await sut.handle(invalidRequest)
    expect(result).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveyByIdStub } = mockSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
  test('should return 500 if SaveSurveyResult throws', async () => {
    const { sut, saveSurveyResultStub } = mockSut()
    jest.spyOn(saveSurveyResultStub, 'save').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })

  test('should return 200 on success', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.handle(mockFakeHttpRequest())
    expect(httpResponse).toEqual(ok(mockFakeSaveSurveyResult()))
  })
})
