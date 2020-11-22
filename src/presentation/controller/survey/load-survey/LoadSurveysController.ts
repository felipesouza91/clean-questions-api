import { IController, IHttpRequest, IHttpResponse, ILoadSurveys } from './LoadSurveysController.protocols'
import { ok } from '../../../helpers/http/HttpHelper'
interface ILoadSurveysControllerProps {
  loadSurveys: ILoadSurveys
}

export class LoadSurveysController implements IController {
  private readonly loadSurveys: ILoadSurveys
  constructor (props: ILoadSurveysControllerProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const surveys = await this.loadSurveys.load()
    return ok(surveys)
  }
}
