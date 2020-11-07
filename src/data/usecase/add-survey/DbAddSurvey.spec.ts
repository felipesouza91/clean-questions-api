import { IAddSurvey, IAddSurveyModel, IAddSurveyRepository } from './DbAddSurvey.protocols'
import { DbAddSurvey } from './DbAddSurvey'

interface ISutType {
  sut: IAddSurvey
  addSurveyRepositoryStub: IAddSurveyRepository
}

const makeFakeAddSurveyRepositoryStub = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async add (data: IAddSurveyModel): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyRepositoryStub()
}

const makeFakeAsnwaers = (): IAddSurveyModel => ({
  question: 'any_question',
  answers: [
    {
      image: 'any_image',
      answer: 'any_answer'
    }
  ]
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
  test('should call AddSurveyRepository if correct values', async () => {
    const { sut, addSurveyRepositoryStub } = makeSut()
    const addSurveyRepositorySpy = jest.spyOn(addSurveyRepositoryStub, 'add')
    await sut.add(makeFakeAsnwaers())
    expect(addSurveyRepositorySpy).toHaveBeenCalledWith(makeFakeAsnwaers())
  })
})
