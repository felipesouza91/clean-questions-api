
import { DbLoadSurveyById } from './DbLoadSurveyById'
import { ISurveyModel, ILoadSurveyByIdRepository } from './DbLoadSurveyById.protocols'
import MockDate from 'mockdate'

interface ISutTypes {
  sut: DbLoadSurveyById
  loadSurveyRepositoryStub: ILoadSurveyByIdRepository
}

const makeFakeSurvey = (): ISurveyModel => ({
  id: 'any-id',
  question: 'Question',
  answers: [{ answer: 'true' }],
  date: new Date()
})

const makeLoadSurveyRepositoryStub = (): ILoadSurveyByIdRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveyByIdRepository {
    async loadById (id: string): Promise<ISurveyModel> {
      return makeFakeSurvey()
    }
  }
  return new LoadSurveysRepositoryStub()
}

const makeSut = (): ISutTypes => {
  const loadSurveyRepositoryStub = makeLoadSurveyRepositoryStub()
  const sut = new DbLoadSurveyById({
    loadSurveyRepository: loadSurveyRepositoryStub
  })
  return {
    sut, loadSurveyRepositoryStub
  }
}

describe('DbLoadSurveyById useCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call LoadSurveyByIdRepository ', async () => {
    const { sut, loadSurveyRepositoryStub } = makeSut()
    const repositoryStub = jest.spyOn(loadSurveyRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(repositoryStub).toHaveBeenCalledWith('any_id')
  })
})
