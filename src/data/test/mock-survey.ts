import { mockFakeSurvey, mockFakeSurveyResultModel, mockFakeSurveysList } from '@src/domain/test'
import { ISaveSurveyResultRepository } from '../protocols/db/survey-result/ISaveSurveyResultRepository'
import { IAddSurveyRepository } from '../protocols/db/survey/IAddSurveyRepository'
import { ILoadSurveyByIdRepository } from '../protocols/db/survey/ILoadSurveyByIdRepository'
import { ILoadSurveysRepository } from '../protocols/db/survey/ILoadSurveysRepository'
import { IAddSurveyResultDTO, ISurveyResultModel } from '../usecase/survey-result/save-survey-result/DbSaveSurveyResult.protocols'
import { IAddSurveyDTO } from '../usecase/survey/add-survey/DbAddSurvey.protocols'
import { ISurveyModel } from '../usecase/survey/load-surveys/DbLoadSurveys.protocols'

export const mockFakeAddSurveyRepositoryStub = (): IAddSurveyRepository => {
  class AddSurveyRepositoryStub implements IAddSurveyRepository {
    async add (data: IAddSurveyDTO): Promise<void> {
      return await Promise.resolve()
    }
  }
  return new AddSurveyRepositoryStub()
}

export const mockLoadSurveysRepositoryStub = (): ILoadSurveysRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveysRepository {
    async loadAll (): Promise<ISurveyModel[]> {
      return mockFakeSurveysList()
    }
  }
  return new LoadSurveysRepositoryStub()
}

export const mockLoadSurveyRepositoryStub = (): ILoadSurveyByIdRepository => {
  class LoadSurveysRepositoryStub implements ILoadSurveyByIdRepository {
    async loadById (id: string): Promise<ISurveyModel> {
      return mockFakeSurvey()
    }
  }
  return new LoadSurveysRepositoryStub()
}

export const mockSaveSurveyResultRepositoryStub = (): ISaveSurveyResultRepository => {
  class SaveSurveyRepositoryStub implements ISaveSurveyResultRepository {
    async save (data: IAddSurveyResultDTO): Promise<ISurveyResultModel> {
      return mockFakeSurveyResultModel()
    }
  }
  return new SaveSurveyRepositoryStub()
}
