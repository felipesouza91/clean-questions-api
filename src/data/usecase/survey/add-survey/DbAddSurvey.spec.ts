import { IAddSurvey, IAddSurveyDTO, IAddSurveyRepository } from './DbAddSurvey.protocols'
import { DbAddSurvey } from './DbAddSurvey'
import { mockFakeSurveyDTO } from '@src/domain/test'
import MockDate from 'mockdate'
interface ISutType {
  sut: IAddSurvey
  addSurveyRepositoryStub: IAddSurveyRepository
}

const mockFakeAddSurveyRepositoryStub = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async add (data: IAddSurveyDTO): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyRepositoryStub()
}

const mockSut = (): ISutType => {
  const addSurveyRepositoryStub = mockFakeAddSurveyRepositoryStub()
  const sut = new DbAddSurvey({
    addSurveyRepository: addSurveyRepositoryStub
  })
  return {
    sut,
    addSurveyRepositoryStub
  }
}

describe('DbAddSurvey UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('should call AddSurveyRepository if correct values', async () => {
    const { sut, addSurveyRepositoryStub } = mockSut()
    const addSurveyRepositorySpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(mockFakeSurveyDTO())
    expect(addSurveyRepositorySpy).toHaveBeenCalledWith(mockFakeSurveyDTO())
  })

  test('should DbAddSurvey throws if AddSurveyRespository throws', async () => {
    const { sut, addSurveyRepositoryStub } = mockSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const response = sut.add(mockFakeSurveyDTO())
    expect(response).rejects.toThrow()
  })
})
