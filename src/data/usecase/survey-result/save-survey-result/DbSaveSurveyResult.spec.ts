import { ISaveSurveyResultRepository, IAddSurveyResultModel, ISurveyResultModel } from './DbSaveSurveyResult.protocols'
import { DbSaveSurveyResult } from './DbSaveSurveyResult'
import MockDate from 'mockdate'

interface ISutType {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
}

const mockFakeAddSurveyResult = (): IAddSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_anser',
  date: new Date()
})
const mockFakeSurveyResultModel = (): ISurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_anser',
  date: new Date()
})

const mockSaveSurveyResultRepositoryStub = (): ISaveSurveyResultRepository => {
  class SaveSurveyRepositoryStub implements ISaveSurveyResultRepository {
    async save (data: IAddSurveyResultModel): Promise<ISurveyResultModel> {
      return mockFakeSurveyResultModel()
    }
  }
  return new SaveSurveyRepositoryStub()
}

const mockSut = (): ISutType => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepositoryStub()
  const sut = new DbSaveSurveyResult({ saveSurveyResultRepository: saveSurveyResultRepositoryStub })
  return {
    sut,
    saveSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult useCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call SaveSurveyRepository with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub } = mockSut()
    const repositorySpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(mockFakeAddSurveyResult())
    expect(repositorySpy).toHaveBeenCalledWith(mockFakeAddSurveyResult())
  })

  test('should return surveyResult on success', async () => {
    const { sut } = mockSut()
    const reponse = await sut.save(mockFakeAddSurveyResult())
    expect(reponse).toEqual(mockFakeSurveyResultModel())
  })

  test('should throws if SaveSurveyRepository throws ', async () => {
    const { sut, saveSurveyResultRepositoryStub } = mockSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(new Error())
    const reponse = sut.save(mockFakeAddSurveyResult())
    expect(reponse).rejects.toThrow()
  })
})
