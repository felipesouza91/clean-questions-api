import { IController, IHttpRequest, IHttpResponse, ILoadSurveys } from './LoadSurveysController.protocols'
import { noContent, ok, serverError } from '@src/presentation/helpers/http/HttpHelper'
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
      const { accountId } = httpRequest
      const surveys = await this.loadSurveys.load(accountId)
      if (surveys.length === 0) {
        return noContent()
      }
      return ok(surveys)
    } catch (error) {
      return serverError(error)
    }
  }
}
