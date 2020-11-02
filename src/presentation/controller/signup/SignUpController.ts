import {
  IHttpRequest,
  IHttpResponse,
  IController,
  IAddAccount
} from './SignUpController.protocols'

import { badRequest, serverError, created } from '../../helpers/http/HttpHelper'
import { IValidation } from '../../protocols/IValidation'

export class SignUpController implements IController {
  private readonly addAccount: IAddAccount
  private readonly validation: IValidation

  constructor (addAccount: IAddAccount,validation: IValidation) {
    this.addAccount = addAccount
    this.validation = validation
  }

  async handle (httpRequest: IHttpRequest): Promise<IHttpResponse> {
    try {
      const error = this.validation.validate(httpRequest.body)
      if (error) {
        return badRequest(error)
      }
      const { name, password, email } = httpRequest.body
      const object = await this.addAccount.add({ name, password, email })
      return created(object)
    } catch (error) {
      return serverError(error)
    }
  }
}
