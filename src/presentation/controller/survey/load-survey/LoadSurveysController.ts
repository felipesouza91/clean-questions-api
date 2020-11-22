import { IController, IHttpRequest, IHttpResponse, ILoadSurveys } from './LoadSurveysController.protocols'
import { noContent, ok, serverError } from '../../../helpers/http/HttpHelper'
interface ILoadSurveysControllerProps {
  loadSurveys: ILoadSurveys
}

export class LoadSurveysController implements IController {
  private readonly loadSurveys: ILoadSurveys
  constructor (props: ILoadSurveysControllerProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const surveys = await this.loadSurveys.load()
      if (!surveys) {
        return noContent()
      }
      return ok(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
