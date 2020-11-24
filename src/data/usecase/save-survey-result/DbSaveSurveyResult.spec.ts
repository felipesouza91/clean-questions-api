import { ISaveSurveyResultRepository, IAddSurveyResultModel, ISurveyResultModel } from './DbSaveSurveyResult.protocols'
import { DbSaveSurveyResult } from './DbSaveSurveyResult'
import MockDate from 'mockdate'

interface ISutType {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
}

const makeFakeAddSurveyResult = (): IAddSurveyResultModel => ({
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_anser',
  date: new Date()
})
const makeFakeSurveyResultModel = (): ISurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  surveyId: 'any_survey_id',
  answer: 'any_anser',
  date: new Date()
})

const makeSaveSurveyResultRepositoryStub = (): ISaveSurveyResultRepository => {
  class SaveSurveyRepositoryStub implements ISaveSurveyResultRepository {
    async save (data: IAddSurveyResultModel): Promise<ISurveyResultModel> {
      return makeFakeSurveyResultModel()
    }
  }
  return new SaveSurveyRepositoryStub()
}

const makeSut = (): ISutType => {
  const saveSurveyResultRepositoryStub = makeSaveSurveyResultRepositoryStub()
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
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    const repositorySpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    await sut.save(makeFakeAddSurveyResult())
    expect(repositorySpy).toHaveBeenCalledWith(makeFakeAddSurveyResult())
  })

  test('should return surveyResult on success', async () => {
    const { sut } = makeSut()
    const reponse = await sut.save(makeFakeAddSurveyResult())
    expect(reponse).toEqual(makeFakeSurveyResultModel())
  })

  test('should throws if SaveSurveyRepository throws ', async () => {
    const { sut, saveSurveyResultRepositoryStub } = makeSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(new Error())
    const reponse = sut.save(makeFakeAddSurveyResult())
    expect(reponse).rejects.toThrow()
  })
})
