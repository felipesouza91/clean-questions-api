import { badRequest } from '../../../helpers/http/HttpHelper'
import { IValidation } from '../../../protocols'
import { IController, IHttpRequest, IHttpResponse } from './AddSurveyController.protocols'

interface IAddSurveyControllerProps {
  validation: IValidation
}

export class AddSurveyController implements IController {
  private readonly validation: IValidation

  constructor (props: IAddSurveyControllerProps) {
    Object.assign(this, props)
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    const error = this.validation.validate(httpRequest.body)
    if (error) {
      return badRequest(error)
    }
    return await new Promise((resolve) => resolve(null))
  }
}
