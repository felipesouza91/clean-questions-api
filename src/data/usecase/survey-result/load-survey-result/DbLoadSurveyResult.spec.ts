import {
  ILoadSurveyResult,
  ILoadSurveyResultRepository,
  mockFakeSurveyResultModel
} from './DbLoadSurveyResult.protocols'
import { DbLoadSurveyResult } from './DbLoadSurveyResult'
import { ISurveyResultModel } from '../save-survey-result/DbSaveSurveyResult.protocols'
import MockDate from 'mockdate'
interface ISutTypes {
  sut: ILoadSurveyResult
  loadSurveyResultRepositoryStub: ILoadSurveyResultRepository
}

const mockLoadSurveyResultRepositoryStub = (): ILoadSurveyResultRepository => {
  class LoadSurveyResultRepositoryStub implements ILoadSurveyResultRepository {
    async loadBySurveyId (surveyId: string): Promise<ISurveyResultModel> {
      return mockFakeSurveyResultModel()
    }
  }
  return new LoadSurveyResultRepositoryStub()
}

const mockSut = (): ISutTypes => {
  const loadSurveyResultRepositoryStub = mockLoadSurveyResultRepositoryStub()
  const sut = new DbLoadSurveyResult({
    loadSurveyResultRepository: loadSurveyResultRepositoryStub
  })
  return {
    sut,
    loadSurveyResultRepositoryStub
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
    await sut.load('any_survey_id')
    expect(repositorySpy).toHaveBeenCalledWith('any_survey_id')
  })

  test('should returns a surveyResult on success', async () => {
    const { sut } = mockSut()
    const response = await sut.load('any_survey_id')
    expect(response).toEqual(mockFakeSurveyResultModel())
  })

  test('should throws if LoadSurveyResultRepository throws ', async () => {
    const { sut, loadSurveyResultRepositoryStub } = mockSut()
    jest.spyOn(loadSurveyResultRepositoryStub, 'loadBySurveyId').mockRejectedValueOnce(new Error())
    const reponse = sut.load('any_survey_id')
    expect(reponse).rejects.toThrow()
  })
})
