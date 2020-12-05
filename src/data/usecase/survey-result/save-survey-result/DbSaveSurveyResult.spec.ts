import { ISaveSurveyResultRepository, ILoadSurveyResultRepository } from './DbSaveSurveyResult.protocols'
import { DbSaveSurveyResult } from './DbSaveSurveyResult'
import { mockFakeSurveyResultModel, mockFakeAddSurveyResultDTO } from '@src/domain/test'
import MockDate from 'mockdate'
import { mockLoadSurveyResultRepositoryStub, mockSaveSurveyResultRepositoryStub } from '@src/data/test/mock-survey'

interface ISutType {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
  loadSurveyResultRepositoryStub: ILoadSurveyResultRepository
}

const mockSut = (): ISutType => {
  const saveSurveyResultRepositoryStub = mockSaveSurveyResultRepositoryStub()
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepositoryStub()
  const sut = new DbSaveSurveyResult({
    saveSurveyResultRepository: saveSurveyResultRepositoryStub ,
    loadSurveyResultRepository: loadSurveyResultRepositoryStub

  })
  return {
    sut,
    saveSurveyResultRepositoryStub,
    loadSurveyResultRepositoryStub
  }
}

describe('DbSaveSurveyResult useCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call dependencies with correct values', async () => {
    const { sut, saveSurveyResultRepositoryStub, loadSurveyResultRepositoryStub } = mockSut()
    const saveRepositorySpy = jest.spyOn(saveSurveyResultRepositoryStub, 'save')
    const loadRepositorySpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.save(mockFakeAddSurveyResultDTO())
    expect(saveRepositorySpy).toHaveBeenCalledWith(mockFakeAddSurveyResultDTO())
    expect(loadRepositorySpy).toHaveBeenCalledWith(mockFakeAddSurveyResultDTO().surveyId, mockFakeAddSurveyResultDTO().accountId)
  })

  test('should return surveyResult on success', async () => {
    const { sut } = mockSut()
    const reponse = await sut.save(mockFakeAddSurveyResultDTO())
    expect(reponse).toEqual(mockFakeSurveyResultModel())
  })

  test('should throws if SaveSurveyRepository throws ', async () => {
    const { sut, saveSurveyResultRepositoryStub } = mockSut()
    jest.spyOn(saveSurveyResultRepositoryStub, 'save').mockRejectedValueOnce(new Error())
    const reponse = sut.save(mockFakeAddSurveyResultDTO())
    expect(reponse).rejects.toThrow()
  })
})
