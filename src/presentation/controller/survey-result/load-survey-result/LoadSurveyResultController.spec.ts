import { mockFakeSurvey } from '@src/domain/test'
import { IHttpRequest, ISurveyModel } from '../../survey/load-survey/LoadSurveysController.protocols'
import { ILoadSurveyById } from './LoadSurveyResultController.protocols'
import { LoadSurveyResultController } from './LoadSurveyResultController'
interface ISutType {
  sut: LoadSurveyResultController
  loadSurveyByIdStub: ILoadSurveyById
}

const mockFakeHttpRequest = (): IHttpRequest => ({
  params: {
    surveyId: 'any_survey_id'
  }
})

const mockLoadSurveyByIdStub = (): ILoadSurveyById => {
  class DbLoadSurveyByIdStub implements ILoadSurveyById {
    async loadById (id: string): Promise<ISurveyModel> {
      return mockFakeSurvey()
    }
  }
  return new DbLoadSurveyByIdStub()
}

const makeSut = (): ISutType => {
  const loadSurveyByIdStub = mockLoadSurveyByIdStub()
  const sut = new LoadSurveyResultController({
    loadSurveyById: loadSurveyByIdStub
  })
  return {
    sut, loadSurveyByIdStub
  }
}

describe('LoadSurveyResultController', () => {
  test('should call loadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSurveyByIdSpy = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(mockFakeHttpRequest())
    expect(loadSurveyByIdSpy).toHaveBeenCalledWith('any_survey_id')
  })
})
