import { LoadSurveysController } from './LoadSurveysController'
import { ISurveyModel, ILoadSurveys } from './LoadSurveysController.protocols'
import { ok } from '../../../helpers/http/HttpHelper'
import MockDate from 'mockdate'
interface ISutTypes {
  sut: LoadSurveysController
  loadSurveysStub: ILoadSurveys

}
const makeFakeSurveys = (): ISurveyModel[] => {
  return [{ id: 'any-id', question: 'Question', answers: [{ answer: 'true' }], date: new Date() }]
}

const makeLoadSurveysStub = (): ILoadSurveys => {
  class LoadSurveysStub implements ILoadSurveys {
    async load (): Promise<ISurveyModel[]> {
      return await Promise.resolve(makeFakeSurveys())
    }
  }

  return new LoadSurveysStub()
}

const makeSut = (): ISutTypes => {
  const loadSurveysStub = makeLoadSurveysStub()
  const sut = new LoadSurveysController({ loadSurveys: loadSurveysStub })
  return {
    sut, loadSurveysStub
  }
}

describe('LoadSurveysController', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })
  afterAll(() => {
    MockDate.reset()
  })

  test('should call LoadSurveys', async () => {
    const { sut, loadSurveysStub } = makeSut()
    const loadSurveysSpy = jest.spyOn(loadSurveysStub, 'load')
    await sut.handle({})
    expect(loadSurveysSpy).toHaveBeenCalled()
  })

  test('should return 200 on success', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(ok(makeFakeSurveys()))
  })
})
