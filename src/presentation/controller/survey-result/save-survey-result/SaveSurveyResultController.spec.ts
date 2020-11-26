
import { SaveSurveyResultController } from './SaveSurveyResultController'
import {
  IHttpRequest, ILoadSurveyById, ISurveyModel
} from './SaveSurveyResultController.protocols'

interface ISutType {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: ILoadSurveyById
}

const makeFakeSurveyModel = (): ISurveyModel => ({
  id: 'any_id',
  answers: [
    { answer: 'any_answer' },
    { answer: 'another_answer' }
  ],
  question: 'any_question',
  date: new Date()
})

const makeFakeHttpRequest = (): IHttpRequest => ({
  params: {
    survey_id: 'any_survey_id'
  }
})

const makeLoadSurveyByIdStub = (): ILoadSurveyById => {
  class LoadSurveyByIdStub implements ILoadSurveyById {
    async loadById (id: string): Promise<ISurveyModel> {
      return makeFakeSurveyModel()
    }
  }
  return new LoadSurveyByIdStub()
}

const makeSut = (): ISutType => {
  const loadSurveyByIdStub = makeLoadSurveyByIdStub()
  const sut = new SaveSurveyResultController({
    loadSurveyById: loadSurveyByIdStub
  })
  return {
    sut,
    loadSurveyByIdStub
  }
}

describe('SaveSurveyResultController', () => {
  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSurveyByIdSpty = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeHttpRequest())
    expect(loadSurveyByIdSpty).toHaveBeenCalledWith('any_survey_id')
  })
})
