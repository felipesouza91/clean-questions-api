
import { DbLoadSurveys } from './DbLoadSurveys'
import { ILoadSurveysRepository, ISurveyModel } from './DbLoadSurveys.protocols'
import MockDate from 'mockdate'

interface ISutTypes {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: ILoadSurveysRepository
}
const mockFakeSurveys = (): ISurveyModel[] => {
  return [{ id: 'any-id', question: 'Question', answers: [{ answer: 'true' }], date: new Date() }]
}
const mockLoadSurveysRepositoryStub = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    async loadAll (): Promise<ISurveyModel[]> {
      return mockFakeSurveys()
    }
  }
  return new LoadSurveysRepositoryStub()
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
    await sut.load()
    expect(repositoryStub).toBeCalled()
  })

  test('should returns a list of surveys', async () => {
    const { sut } = mockSut()
    const response = await sut.load()
    expect(response).toEqual(mockFakeSurveys())
  })

  test('should throws if LoadSurveysRepository throws ', async () => {
    const { sut, loadSurveysRepositoryStub } = mockSut()
    jest.spyOn(loadSurveysRepositoryStub, 'loadAll').mockRejectedValueOnce(new Error())
    const reponse = sut.load()
    expect(reponse).rejects.toThrow()
  })
})
