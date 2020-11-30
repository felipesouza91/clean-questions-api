
import { DbLoadSurveyById } from './DbLoadSurveyById'
import { ILoadSurveyByIdRepository } from './DbLoadSurveyById.protocols'
import MockDate from 'mockdate'
import { mockLoadSurveyRepositoryStub } from '@src/data/test/mock-survey'
import { mockFakeSurvey } from '@src/domain/test'

interface ISutTypes {
  sut: DbLoadSurveyById
  loadSurveyRepositoryStub: ILoadSurveyByIdRepository
}

const mockSut = (): ISutTypes => {
  const loadSurveyRepositoryStub = mockLoadSurveyRepositoryStub()
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
    const { sut, loadSurveyRepositoryStub } = mockSut()
    const repositoryStub = jest.spyOn(loadSurveyRepositoryStub, 'loadById')
    await sut.loadById('any_id')
    expect(repositoryStub).toHaveBeenCalledWith('any_id')
  })
  test('should returns a survey on success', async () => {
    const { sut } = mockSut()
    const response = await sut.loadById('any_id')
    expect(response).toEqual(mockFakeSurvey())
  })

  test('should throws if LoadSurveyByIdRepository throws ', async () => {
    const { sut, loadSurveyRepositoryStub } = mockSut()
    jest.spyOn(loadSurveyRepositoryStub, 'loadById').mockRejectedValueOnce(new Error())
    const reponse = sut.loadById('any_id')
    expect(reponse).rejects.toThrow()
  })
})
