import { IController, IHttpRequest, IHttpResponse, ILoadSurveys } from './LoadSurveysController.protocols'

interface ILoadSurveysControllerProps {
  loadSurveys: ILoadSurveys
}

export class LoadSurveysController implements IController {
  private readonly loadSurveys: ILoadSurveys
  constructor (props: ILoadSurveysControllerProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    await this.loadSurveys.load()
    return await Promise.resolve(null)
  }
}
