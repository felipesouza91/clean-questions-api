
import { DbLoadSurveys } from './DbLoadSurveys'
import { ILoadSurveysRepository, ISurveyModel } from './DbLoadSurveys.protocols'

interface ISutTypes {
  sut: DbLoadSurveys
  loadSurveysRepositoryStub: ILoadSurveysRepository
}

const makeLoadSurveysRepositoryStub = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    async load (): Promise<ISurveyModel[]> {
      return null
    }
  }
  return new LoadSurveysRepositoryStub()
}

const makeSut = (): ISutTypes => {
  const loadSurveysRepositoryStub = makeLoadSurveysRepositoryStub()
  const sut = new DbLoadSurveys({
    loadSurveysRepository: loadSurveysRepositoryStub
  })
  return {
    sut, loadSurveysRepositoryStub
  }
}

describe('DbLoadSurveys', () => {
  test('should call LoadSurveysRepository ', async () => {
    const { sut, loadSurveysRepositoryStub } = makeSut()
    const repositoryStub = jest.spyOn(loadSurveysRepositoryStub, 'load')
    await sut.load()
    expect(repositoryStub).toBeCalled()
  })
})
