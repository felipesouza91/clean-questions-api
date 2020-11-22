import { ISurveyModel, ILoadSurveys, ILoadSurveysRepository } from './DbLoadSurveys.protocols'

interface IDbLoadSurveysProps {
  loadSurveysRepository: ILoadSurveysRepository
}

export class DbLoadSurveys implements ILoadSurveys {
  private readonly loadSurveysRepository: ILoadSurveysRepository
  constructor (props: IDbLoadSurveysProps) {
    Object.assign(this, props)
  }

  async load (): Promise<ISurveyModel[]> {
    await this.loadSurveysRepository.load()
    return null
  }
}
