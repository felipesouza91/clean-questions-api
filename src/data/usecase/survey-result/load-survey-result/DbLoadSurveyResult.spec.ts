import {
  ILoadSurveyResult,
  ILoadSurveyResultRepository,
  mockFakeSurveyResultModel,
  ILoadSurveyByIdRepository
} from './DbLoadSurveyResult.protocols'
import { DbLoadSurveyResult } from './DbLoadSurveyResult'

import MockDate from 'mockdate'
import { mockLoadSurveyResultRepositoryStub, mockLoadSurveyRepositoryStub } from '@src/data/test/mock-survey'

interface ISutTypes {
  sut: ILoadSurveyResult
  loadSurveyResultRepositoryStub: ILoadSurveyResultRepository
  loadSurveyByIdRepositoryStub: ILoadSurveyByIdRepository
}

const mockSut = (): ISutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepositoryStub()
  const loadSurveyByIdRepositoryStub = mockLoadSurveyRepositoryStub()
  const sut = new DbLoadSurveyResult({
    loadSurveyResultRepository: loadSurveyResultRepositoryStub,
    loadSurveyByIdRepository: loadSurveyByIdRepositoryStub
  })
  return {
    sut,
    loadSurveyResultRepositoryStub,
    loadSurveyByIdRepositoryStub
  }
}

describe('DbLoadSurveyResult UseCase', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('shoud call LoadSurveyResultRepository with correct value ', async () => {
    const { sut , loadSurveyResultRepositoryStub } = mockSut()
    const repositorySpy = jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId')
    await sut.load('any_survey_id', 'any_account_id')
    expect(repositorySpy).toHaveBeenCalledWith('any_survey_id', 'any_account_id')
  })

  test('should returns a surveyResult on success', async () => {
    const { sut } = mockSut()
    const response = await sut.load('any_survey_id', 'any_account_id')
    expect(response).toEqual(mockFakeSurveyResultModel())
  })

  test('should call LoadSurveyByIdRepository if LoadSurveyResultRepository returns null', async () => {
    const { sut , loadSurveyResultRepositoryStub, loadSurveyByIdRepositoryStub } = mockSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockResolvedValueOnce(null)
    const loadSurveyByIdRepositorySpy = jest.spyOn(loadSurveyByIdRepositoryStub, 'loadById')
    await sut.load('any_survey_id', 'any_account_id')
    expect(loadSurveyByIdRepositorySpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('should return surveyResultModel with all answer with count 0 if LoadSurveyResultRepository returns null', async () => {
    const { sut , loadSurveyResultRepositoryStub } = mockSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockResolvedValueOnce(null)
    const surveyResult = await sut.load('any_survey_id', 'any_account_id')
    expect(surveyResult).toBeTruthy()
    expect(surveyResult.answers[0].percent).toBe(0)
    expect(surveyResult.answers[0].count).toBe(0)
  })

  test('should throws if LoadSurveyResultRepository throws ', async () => {
    const { sut, loadSurveyResultRepositoryStub } = mockSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const reponse = sut.load('any_survey_id', 'any_account_id')
    expect(reponse).rejects.toThrow()
  })
})
