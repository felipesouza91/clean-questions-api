import { SaveSurveyResultController } from './SaveSurveyResultController'
import {
  IHttpRequest,
  ILoadSurveyById,
  ISurveyModel,
  forbidden,
  InvalidParamError,
  ISaveSurveyResult,
  IAddSurveyResultModel,
  ISurveyResultModel,
  serverError
} from './SaveSurveyResultController.protocols'
import MockDate from 'mockdate'
interface ISutType {
  sut: SaveSurveyResultController
  loadSurveyByIdStub: ILoadSurveyById
  saveSurveyResultStub: ISaveSurveyResult
}

const makeFakeSurveyModel = (): ISurveyModel => ({
  id: 'any_survey_id',
  answers: [
    { answer: 'any_answer' },
    { answer: 'another_answer' }
  ],
  question: 'any_question',
  date: new Date()
})

const makeFakeAddSaveSurveyResult = (): IAddSurveyResultModel => ({
  accountId: 'any_account_id',
  answer: 'any_answer',
  surveyId: 'any_survey_id',
  date: new Date()
})

const makeFakeSaveSurveyResult = (): ISurveyResultModel => ({
  id: 'any_id',
  accountId: 'any_account_id',
  answer: 'any_answer',
  surveyId: 'any_survey_id',
  date: new Date()
})

const makeFakeHttpRequest = (): IHttpRequest => ({
  params: {
    survey_id: 'any_survey_id'
  },
  body: {
    answer: 'any_answer'
  },
  accountId: 'any_account_id'
})

const makeLoadSurveyByIdStub = (): ILoadSurveyById => {
  class LoadSurveyByIdStub implements ILoadSurveyById {
    async loadById (id: string): Promise<ISurveyModel> {
      return makeFakeSurveyModel()
    }
  }
  return new LoadSurveyByIdStub()
}

const makeSaveSurveyResultStub = (): ISaveSurveyResult => {
  class SaveSurveyResultStub implements ISaveSurveyResult {
    async save (data: IAddSurveyResultModel): Promise<ISurveyResultModel> {
      return makeFakeSaveSurveyResult()
    }
  }
  return new SaveSurveyResultStub()
}

const makeSut = (): ISutType => {
  const loadSurveyByIdStub = makeLoadSurveyByIdStub()
  const saveSurveyResultStub = makeSaveSurveyResultStub()
  const sut = new SaveSurveyResultController({
    loadSurveyById: loadSurveyByIdStub,
    saveResultSurvey: saveSurveyResultStub
  })
  return {
    sut,
    loadSurveyByIdStub,
    saveSurveyResultStub
  }
}

describe('SaveSurveyResultController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })
  test('should call LoadSurveyById with correct values', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    const loadSurveyByIdSpty = jest.spyOn(loadSurveyByIdStub, 'loadById')
    await sut.handle(makeFakeHttpRequest())
    expect(loadSurveyByIdSpty).toHaveBeenCalledWith('any_survey_id')
  })

  test('should call SaveSurveyResult with correct values', async () => {
    const { sut, saveSurveyResultStub } = makeSut()
    const saveSurveyResultSpty = jest.spyOn(saveSurveyResultStub, 'save')
    await sut.handle(makeFakeHttpRequest())
    expect(saveSurveyResultSpty).toHaveBeenCalledWith(makeFakeAddSaveSurveyResult())
  })

  test('should return 403 if LoadSurveyById return null', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockResolvedValueOnce(null)
    const result = await sut.handle(makeFakeHttpRequest())
    expect(result).toEqual(forbidden(new InvalidParamError('survey_id')))
  })

  test('should return 403 if an invalid answer is provider', async () => {
    const { sut } = makeSut()
    const invalidRequest = { ...makeFakeHttpRequest(), body: { answer: 'invalid_any_answer' } }
    const result = await sut.handle(invalidRequest)
    expect(result).toEqual(forbidden(new InvalidParamError('answer')))
  })

  test('should return 500 if LoadSurveys throws', async () => {
    const { sut, loadSurveyByIdStub } = makeSut()
    jest.spyOn(loadSurveyByIdStub, 'loadById').mockRejectedValueOnce(new Error())
    const httpResponse = await sut.handle(makeFakeHttpRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
