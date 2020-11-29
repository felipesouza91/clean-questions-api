import { IAddSurvey, IAddSurveyDTO, IAddSurveyRepository } from './DbAddSurvey.protocols'
import { DbAddSurvey } from './DbAddSurvey'
import MockDate from 'mockdate'
interface ISutType {
  sut: IAddSurvey
  addSurveyRepositoryStub: IAddSurveyRepository
}

const makeFakeAddSurveyRepositoryStub = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async add (data: IAddSurveyDTO): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyRepositoryStub()
}

const makeFakeAsnwaers = (): IAddSurveyDTO => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ],
  date: new Date()
})

const makeSut = (): ISutType => {
  const addSurveyRepositoryStub = makeFakeAddSurveyRepositoryStub()
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
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSurveyRepositorySpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(makeFakeAsnwaers())
    expect(addSurveyRepositorySpy).toHaveBeenCalledWith(makeFakeAsnwaers())
  })

  test('should DbAddSurvey throws if AddSurveyRespository throws', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    jest.spyOn(addSurveyRepositoryStub, 'add').mockRejectedValueOnce(new Error())
    const response = sut.add(makeFakeAsnwaers())
    expect(response).rejects.toThrow()
  })
})
