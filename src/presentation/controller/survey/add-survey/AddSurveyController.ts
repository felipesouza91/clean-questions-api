
import { badRequest, noContent, serverError } from '@src/presentation/helpers/http/HttpHelper'
import { IValidation } from '@src/presentation/protocols'
import { IController, IHttpRequest, IHttpResponse, IAddSurvey } from './AddSurveyController.protocols'

interface IAddSurveyControllerProps {
  validation: IValidation
  addSurvey: IAddSurvey
}

export class AddSurveyController implements IController {
  private readonly validation: IValidation
  private readonly addSurvey: IAddSurvey

  constructor (props: IAddSurveyControllerProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { answers, question } = httpRequest.body
      await this.addSurvey.add({ answers, question, date: new Date() })
      return noContent()
    } catch (error) {
      return serverError(error)
    }
  }
}
