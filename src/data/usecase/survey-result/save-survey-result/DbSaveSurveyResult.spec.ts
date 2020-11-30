import { ISaveSurveyResultRepository } from './DbSaveSurveyResult.protocols'
import { DbSaveSurveyResult } from './DbSaveSurveyResult'
import { mockFakeSurveyResultModel, mockFakeAddSurveyResultDTO } from '@src/domain/test'
import MockDate from 'mockdate'
import { mockSaveSurveyResultRepositoryStub } from '@src/data/test/mock-survey'

interface ISutType {
  sut: DbSaveSurveyResult
  saveSurveyResultRepositoryStub: ISaveSurveyResultRepository
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
    await sut.save(mockFakeAddSurveyResultDTO())
    expect(repositorySpy).toHaveBeenCalledWith(mockFakeAddSurveyResultDTO())
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
