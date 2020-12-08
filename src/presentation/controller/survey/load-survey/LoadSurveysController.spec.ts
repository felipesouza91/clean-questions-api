import { LoadSurveysController } from './LoadSurveysController'
import { ISurveyModel, ILoadSurveys, IHttpRequest } from './LoadSurveysController.protocols'
import { noContent, ok, serverError } from '@src/presentation/helpers/http/HttpHelper'
import MockDate from 'mockdate'

interface ISutTypes {
  sut: LoadSurveysController
  loadSurveysStub: ILoadSurveys

}

const mockFakeHttpRequest = (): IHttpRequest => ({
  accountId: 'any_account_id'
})

const mockFakeSurveys = (): ISurveyModel[] => {
  return [{ id: 'any-id', question: 'Question', answers: [{ answer: 'true' }], date: new Date() }]
}

const mockLoadSurveysStub = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load (accountId: string): Promise<ISurveyModel[]> {
      return await Promise.resolve(mockFakeSurveys())
    }
  }

  return new LoadSurveysStub()
}

const mockSut = (): ISutTypes => {
  const loadSurveysStub = mockLoadSurveysStub()
  const sut = new LoadSurveysController({ loadSurveys: loadSurveysStub })
  return {
    sut, loadSurveysStub
  }
}

describe('LoadSurveysController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveys with correct value', async () => {
    const { sut, loadSurveysStub } = mockSut()
    const loadSurveysSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle(mockFakeHttpRequest())
    expect(loadSurveysSpy).toHaveBeenCalledWith('any_account_id')
  })

  test('should return 200 on success', async () => {
    const { sut } = mockSut()
    const httpResponse = await sut.handle(mockFakeHttpRequest())
    expect(httpResponse).toEqual(ok(mockFakeSurveys()))
  })

  test('should return 204 if no LoadSurveys returns empty', async () => {
    const { sut, loadSurveysStub } = mockSut()
    jest.spyOn(loadSurveysStub, 'load').mockResolvedValueOnce([])
    const httpResponse = await sut.handle(mockFakeHttpRequest())
    expect(httpResponse).toEqual(noContent())
  })

  test('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveysStub } = mockSut()
    jest.spyOn(loadSurveysStub, 'load').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(mockFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
