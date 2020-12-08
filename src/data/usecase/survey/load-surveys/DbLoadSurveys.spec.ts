
import { DbLoadSurveys } from './DbLoadSurveys'
import { ILoadSurveysRepository } from './DbLoadSurveys.protocols'
import { mockFakeSurveysList } from '@src/domain/test'
import MockDate from 'mockdate'
import { mockLoadSurveysRepositoryStub } from '@src/data/test/mock-survey'

interface ISutTypes {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: ILoadSurveysRepository
}

const mockSut = (): ISutTypes => {
  const loadSurveysRepositoryStub = mockLoadSurveysRepositoryStub()
  const sut = new DbLoadSurveys({
    loadSurveysRepository: loadSurveysRepositoryStub
  })
  return {
    sut, loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call LoadSurveysRepository ', async () => {
    const { sut, loadSurveysRepositoryStub } = mockSut()
    const repositoryStub = jest.spyOn(loadSurveysRepositoryStub, 'loadAll')
    await sut.load('any_account_id')
    expect(repositoryStub).toHaveBeenCalledWith('any_account_id')
  })

  test('should returns a list of surveys', async () => {
    const { sut } = mockSut()
    const response = await sut.load('any_account_id')
    expect(response).toEqual(mockFakeSurveysList())
  })

  test('should throws if LoadSurveysRepository throws ', async () => {
    const { sut, loadSurveysRepositoryStub } = mockSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const reponse = sut.load('any_account_id')
    expect(reponse).rejects.toThrow()
  })
})
