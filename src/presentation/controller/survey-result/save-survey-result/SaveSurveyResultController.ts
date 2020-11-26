import {
  IController,
  IHttpRequest,
  IHttpResponse,
  ILoadSurveyById
} from './SaveSurveyResultController.protocols'

interface ISaveSurveyResultControllerProps {
  loadSurveyById: ILoadSurveyById
}

export class SaveSurveyResultController implements IController {
  private readonly loadSurveyById: ILoadSurveyById
  constructor (props: ISaveSurveyResultControllerProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const { params } = httpRequest
    await this.loadSurveyById.loadById(params.survey_id)

    return null
  }
}
